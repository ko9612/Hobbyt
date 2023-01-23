package com.hobbyt.global.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.filter.JwtAuthenticationFilter;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

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
		// reissue 를 security에서 제외하지 않으면 필터 jwtVerificationFilter 에서 컨트롤러 test시 에러 발생(MemberDetailsService의 MemberNotExistException)
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http

			.httpBasic().disable()
			.formLogin().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisService),
				UsernamePasswordAuthenticationFilter.class)

			.csrf().disable()
			.cors(Customizer.withDefaults())

			/*.apply(new CustomFilterConfigurer())
			.and()*/

			.authorizeRequests()
			.antMatchers("/api/members/signup", "/api/auth/login").permitAll()
			.antMatchers("/api/sales").permitAll()
			.antMatchers("/api/members/profile/{memberId:[0-9]+}").permitAll()
			.antMatchers(HttpMethod.GET, "/api/search/**").permitAll()
			.antMatchers(HttpMethod.GET, "/api/members/{memberId:[0-9]+}/private/**").permitAll()
			.antMatchers(HttpMethod.GET, "/api/posts/{postId:[0-9]+}").permitAll()
			.antMatchers("/api/healthcheck", "/api/auth/code", "/api/auth/reissue", "/api/members/signup").permitAll()
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

	/*public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
		@Override
		public void configure(HttpSecurity builder) throws Exception {

			AuthenticationManager authenticationManager =
				builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter =
				new JwtAuthenticationFilter(authenticationManager, redisService, jwtTokenProvider);

			JwtVerificationFilter jwtVerificationFilter =
				new JwtVerificationFilter(jwtTokenProvider, userDetailsService, redisService);

			jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/login");
			jwtAuthenticationFilter.setPostOnly(true);

			builder
				.addFilterBefore(jwtVerificationFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		}
	}*/
}
