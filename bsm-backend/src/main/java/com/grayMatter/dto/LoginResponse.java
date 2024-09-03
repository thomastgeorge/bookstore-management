package com.grayMatter.dto;

import com.grayMatter.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

	String token;
	long expirationTime;
	User user;
	
}
