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

import com.hobbyt.global.error.filter.ExceptionHandlerFilter;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.filter.JwtAuthenticationFilter;
import com.hobbyt.global.security.filter.JwtVerificationFilter;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.service.MemberDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberDetailsService memberDetailsService;

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> {
			web.ignoring()
				//.requestMatchers(PathRequest.toStaticResources().atCommonLocations())
				.antMatchers(
					"/api-document/**", "/api/auth/reissue"
				);
		};
		// reissue 를 security에서 제외하지 않으면 필터 jwtVerificationFilter 에서 에러 발생(MemberDetailsService의 MemberNotExistException)
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
			.antMatchers("/api/**").permitAll()
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

			JwtVerificationFilter jwtVerificationFilter =
				new JwtVerificationFilter(jwtTokenProvider, memberDetailsService, redisService);

			jwtAuthenticationFilter.setFilterProcessesUrl("/api/members/login");

			// 로그인 처리 필터(JwtAuthenticationFilter) -> 로그인 상태인지 검증하는 필터(JwtVerificationFilter)
			// 만약 Authorization 헤더 값이 없거나 access token 이 없으면 JwtVerificationFilter 를 건너뛴다

			// 로그인의 경우 JwtAuthenticationFilter 로 필터가 이 부분에서 끊김 >> 이 클래스의 메서드에 doFilter 가 없다
			// success(successfulAuthentication 메소드) 인지 unsuccess(unsuccessfulAuthentication 메소드) 인지에 따라 결과만 나올뿐
			builder
				.addFilterBefore(jwtVerificationFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtAuthenticationFilter, JwtVerificationFilter.class)
				.addFilterBefore(new ExceptionHandlerFilter(), JwtAuthenticationFilter.class);

				/*.addFilter(jwtAuthenticationFilter)
				.addFilterAfter(jwtVerificationFilter, jwtAuthenticationFilter.class);*/
		}
	}
}
