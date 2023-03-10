package com.hobbyt.global.config;

import static org.springframework.security.config.Customizer.*;

import java.util.Arrays;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
import com.hobbyt.global.security.exception.CustomAuthenticationEntryPoint;
import com.hobbyt.global.security.filter.JwtAuthenticationFilter;
import com.hobbyt.global.security.handler.Oauth2SuccessHandler;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.service.OAuth2DetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;
	private final OAuth2DetailsService oAuth2DetailsService;

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> {
			web.ignoring()
				.requestMatchers(PathRequest.toStaticResources().atCommonLocations())
				.antMatchers(
					"/api-document/**", "/api/auth/reissue"
				);
		};
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http

			.httpBasic()
			.disable()
			.formLogin()
			.disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisService),
				UsernamePasswordAuthenticationFilter.class)

			.csrf()
			.disable()
			.cors(withDefaults())

			.exceptionHandling()
			.authenticationEntryPoint(new CustomAuthenticationEntryPoint())
			.and()

			.authorizeRequests()
			.mvcMatchers("/websocket")
			.permitAll()
			.mvcMatchers(HttpMethod.GET, "/api/images/**").permitAll()
			.antMatchers("/api/members/{memberId:[0-9]+}/following", "/api/members/{memberId:[0-9]+}/follower")
			.permitAll()
			.antMatchers(HttpMethod.GET, "/api/main/**")
			.permitAll()
			.antMatchers("/api/members/signup", "/api/auth/login")
			.permitAll()
			.antMatchers(HttpMethod.GET, "/api/sales/{saleId:[0-9]+}")
			.permitAll()
			// .antMatchers("/api/**").permitAll()
			.antMatchers("/api/members/{memberId:[0-9]+}/profile")
			.permitAll()
			.antMatchers(HttpMethod.GET, "/api/search/**")
			.permitAll()
			.antMatchers(HttpMethod.GET, "/api/members/{memberId:[0-9]+}/private/**")
			.permitAll()
			.antMatchers(HttpMethod.GET, "/api/posts/{postId:[0-9]+}")
			.permitAll()
			.antMatchers("/api/healthcheck", "/api/auth/code", "/api/members/signup")
			.permitAll()
			.anyRequest()
			.authenticated()

			.and()
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint().userService(oAuth2DetailsService)
				.and()
				.successHandler(new Oauth2SuccessHandler(jwtTokenProvider, redisService))
			);

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
}
