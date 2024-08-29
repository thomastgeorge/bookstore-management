package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.User;

@Component
public class UserMapper {
	
	public UserDto mapToUserDto(User user) {
		return new UserDto(
				user.getUserId(),
				user.getEmail(),
				user.getPassword(),
				user.getRole()
				);
	}
	
	public User mapToUser(UserDto userDto) {
		return new User(
				userDto.getUserId(),
				userDto.getEmail(),
				userDto.getPassword(),
				userDto.getRole()
				);
	}

}
