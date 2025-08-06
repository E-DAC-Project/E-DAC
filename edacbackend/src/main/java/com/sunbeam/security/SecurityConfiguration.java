package com.sunbeam.security;

import java.util.List;

//import java.util.List;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
//import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

@Configuration // to declare config class - to declare spring beans - @Bean)
@EnableWebSecurity // to customize spring security
@EnableMethodSecurity // to enable method level annotations
//(@PreAuthorize , @PostAuthorize..) to specify  authorization rules
@AllArgsConstructor
public class SecurityConfiguration {
	//depcy - password encoder
	//private final PasswordEncoder encoder;
	private final CustomJwtFilter customJwtFilter;
	private JwtAuthEntryPoint jwtAuthEntryPoint;
/* configure spring bean to customize spring security filter chain
 * disable CSRF protection
 - session creation policy - stateless
 - disable form login based authentication
 - enable basic authentication scheme , for REST clients
 */
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowedOrigins(List.of("http://localhost:3000")); // or setAllowedOriginPatterns for wildcard
	    config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
	    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
	    config.setAllowedHeaders(List.of("*"));
	    config.setAllowCredentials(true);
	    config.setMaxAge(3600L);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		System.out.println("Inside security config");
		http.cors(Customizer.withDefaults());
		//1. Disable CSRF protection
		http.csrf(csrf -> csrf.disable());
		//2. Authenticate any request 
		http.authorizeHttpRequests(request -> 
		//5.permit all - swagger , view all restaurants , user signin , sign up....
		request.requestMatchers("/swagger-ui/**","/v**/api-docs/**","/users/signin","/users/signup").permitAll()
		//6. restaurants - GET - to get all restaurants  - no authentication
		.requestMatchers(HttpMethod.GET).permitAll()
		//get restaurant by id - customer
		.requestMatchers(HttpMethod.GET,"/restaurants/{id}")
		.hasRole("CUSTOMER")
		//update restaurant details - admin
		.requestMatchers(HttpMethod.PUT,"/restaurants/{id}").hasRole("ADMIN")
		.anyRequest().authenticated());
		//3. enable HTTP basic auth
	//	http.httpBasic(Customizer.withDefaults());
		//4. set session creation policy - stateless
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		//5. add custom JWT filter before -UserNamePasswordAuthFilter 
		http.addFilterBefore(customJwtFilter
				, UsernamePasswordAuthenticationFilter.class);
		//6. Customize error code of SC 401 , in case of authentication failure
		http.exceptionHandling
		(ex -> ex.authenticationEntryPoint(jwtAuthEntryPoint));
		System.out.println("end security config");
		return http.build();
	}
	//configure a spring to return Spring security authentication manager
	@Bean
	AuthenticationManager authenticationManager
	(AuthenticationConfiguration mgr) throws Exception {
		return mgr.getAuthenticationManager();
	}
	
	
}
