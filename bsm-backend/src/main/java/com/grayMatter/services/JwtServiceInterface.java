package com.grayMatter.services;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;

import com.grayMatter.configuration.UserPrincipal;

import io.jsonwebtoken.Claims;

public interface JwtServiceInterface {
	
String extractUserName(String token);
    
    Date ExtractExpirationTime(String token);
    
    boolean isTokenExpired(String token);
    
    boolean isTokenValid(String token, UserDetails userDetails);
    
    Claims extractClaims(String token);
    
    String generateToken(UserPrincipal userPrincipal);
    
    long expirationTime();

}
