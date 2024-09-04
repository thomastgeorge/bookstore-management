package com.grayMatter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.configuration.UserPrincipal;
import com.grayMatter.dto.LoginResponse;
import com.grayMatter.dto.LoginUserDto;
import com.grayMatter.dto.RegUserDto;
import com.grayMatter.entities.User;
import com.grayMatter.services.AuthenticationService;
import com.grayMatter.services.JwtService;

@RestController
@RequestMapping("api/v1/auth")
public class AuthenticationController {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationService authService;
	
	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody RegUserDto regUserDto){
		User regUser = authService.signUp(regUserDto);
		return ResponseEntity.ok(regUser);
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto){
		User authenticatedUser = authService.login(loginUserDto);
		
		String token = jwtService.generateToken(new UserPrincipal(authenticatedUser));
		
		LoginResponse loginResponse=new LoginResponse();
		loginResponse.setToken(token);
		loginResponse.setExpirationTime(jwtService.expirationTime());
		loginResponse.setUser(authenticatedUser);
		return ResponseEntity.ok(loginResponse);
		
		
		
	}

}