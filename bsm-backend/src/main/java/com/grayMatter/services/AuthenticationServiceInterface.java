package com.grayMatter.services;

import com.grayMatter.dto.LoginUserDto;
import com.grayMatter.dto.RegUserDto;
import com.grayMatter.entities.User;

public interface AuthenticationServiceInterface {
	
	User signUp(RegUserDto regUserDto);
    
    User login(LoginUserDto loginUserDto);

}
