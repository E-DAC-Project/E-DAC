package com.sunbeam.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AuthResp;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignupReqDTO;
import com.sunbeam.entities.UserEntity;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserSignInSignUpController {
	//depcy - user service i/f
	private final UserService userService;
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
	/*
	 * Desc - sign in
	 * URL - http://host:port/users/signin
	 * Method - POST
	 * Payload - signin dto 
	 * Successful Resp -SC 200 ,body - mesg , JWT
	 * failed - SC 401 , err mesg - api resp
	 */
	@PostMapping("/signin")
	@Operation(description = "User sign in ")
	public ResponseEntity<?> userSignIn(@RequestBody SignInDTO dto) {
		System.out.println("in sign in "+dto);
		//1. invoke AuthenticationMgr's authenticate method
		/*
		 * API
		 * 1.1 Authentication authenticate(Authentication auth) 
		 * throws AuthenticationException
		 * i/p - not yet verified credentails
		 * o/p - verified credentials
		 * 1.2 Authentication : i/f
		 * Implemented by UserNamePasswordAuthenticationToken
		 * (String userName|email,String password) 
		 * 
		 */
		Authentication authToken=	new
		UsernamePasswordAuthenticationToken(dto.getEmail(),
				dto.getPassword());
		System.out.println(authToken);
		System.out.println("before - "+authToken.isAuthenticated());//false
		Authentication validAuth = 
				authenticationManager.authenticate(authToken);
		//=> success
		System.out.println("after - "+validAuth.isAuthenticated());//true
		System.out.println(validAuth);//user details : UserEntity
		//2. Create signed JWT n send it in the response.
		UserEntity user = (UserEntity) validAuth.getPrincipal();
		String token = jwtUtils.generateJwtToken(validAuth);
		return ResponseEntity.ok(Map.of(
				"token", token,
				"Name", user.getFirstName() +" "+user.getLastName(),
				"email", user.getEmail(), 
				"Role", user.getUserRole()
				));
	}
	/*
	 * - Desc - User registration
	 *  URL - http://host:port/users/signup
	 * Method - POST
		payload -user signup req dto
		resp - SC 201 , user resp  dto 
		error - dup email - SC 400 | SC 409 , api resp - error mesg
	 */
	@PostMapping("/signup")
	public ResponseEntity<?> signupUser(@RequestBody @Valid
			SignupReqDTO dto)
	{
		System.out.println("in signup "+dto);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.signUp(dto));
				
	}
}
