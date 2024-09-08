package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.ChangePassword;
import com.grayMatter.dto.UserDto;

public interface UserServiceInterface {
	
	UserDto getUserById(long userId);
    
    List<UserDto> getAllUser();
    
    UserDto updateUser(long userId, UserDto userDto);
    
    void deleteUser(long userId);
    
    UserDto updatePassword(long userId, ChangePassword changePassword);

}
