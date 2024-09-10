package com.grayMatter.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig{

	@Autowired
	private AuthenticationProvider authProvider;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
	public SecurityFilterChain doSecurityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors().configurationSource(corsConfigurationSource())
		.and()
		.csrf().disable()
		.authorizeRequests()
		.requestMatchers("/api/v1/auth/**").permitAll()
        .requestMatchers("/api/v1/book/USER/search**").permitAll()
        .requestMatchers("/api/v1/book/new-arrivals/**").permitAll()
        .requestMatchers("/api/v1/book/top-rated/**").permitAll()
        .requestMatchers("/api/v1/book/best-selling/**").permitAll()
        .requestMatchers("/api/v1/user/updatePasswordLogin/**").permitAll()
        .requestMatchers("/api/v1/book/**").permitAll()
        .requestMatchers("/api/v1/order/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/review/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/address/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/cart/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/user/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/customer/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/category/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/bookorder/**").hasAnyRole("USER", "ADMIN")
        .requestMatchers("/api/v1/customer/**").hasAnyRole("USER", "ADMIN")
        .anyRequest().authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authenticationProvider(authProvider)
		.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}	
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
  
}
