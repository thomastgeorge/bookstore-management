package com.grayMatter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.AuthenticationDao;
import com.grayMatter.dto.LoginUserDto;
import com.grayMatter.dto.RegUserDto;
import com.grayMatter.entities.User;

@Service
public class AuthenticationService implements AuthenticationServiceInterface {
	
	@Autowired
	private AuthenticationDao authenticationDao;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Override
	public User signUp(RegUserDto regUserDto) {
		return authenticationDao.signUp(regUserDto);
	}

	@Override
	public User login(LoginUserDto loginUserDto) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginUserDto.getEmail(),
				loginUserDto.getPassword()
				)
			);
		return authenticationDao.login(loginUserDto);
	}

}
