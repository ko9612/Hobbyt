package com.hobbyt.global.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hobbyt.global.security.filter.JwtAuthenticationFilter;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.service.RedisService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> {
			web.ignoring()
				//.requestMatchers(PathRequest.toStaticResources().atCommonLocations())
				.antMatchers(
					"/api-document/**"
				);
		};
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http

			.httpBasic().disable()
			.formLogin().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()

			.csrf().disable()
			.cors(Customizer.withDefaults())

			.apply(new CustomFilterConfigurer())
			.and()

			.authorizeRequests()
			.antMatchers("/api/auth/**", "/api/members/signup").permitAll()
			.anyRequest().authenticated();

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		setCorsConfiguration(configuration);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

	private void setCorsConfiguration(CorsConfiguration configuration) {
		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
		configuration.setExposedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
		@Override
		public void configure(HttpSecurity builder) throws Exception {

			AuthenticationManager authenticationManager =
				builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter =
				new JwtAuthenticationFilter(authenticationManager, redisService, jwtTokenProvider);

			jwtAuthenticationFilter.setFilterProcessesUrl("/api/members/login");

			builder.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		}
	}
}
