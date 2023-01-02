package com.hobbyt.global.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> {
			web.ignoring()
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

			.authorizeRequests()
			.antMatchers("/api/auth/**").permitAll()
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
}
