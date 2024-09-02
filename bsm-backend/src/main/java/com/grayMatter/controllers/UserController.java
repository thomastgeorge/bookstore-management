package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.UserDto;
import com.grayMatter.services.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{userId}")
	public UserDto getUserById(@PathVariable("userId") long userId) {
		return userService.getUserById(userId);
	}
	
	@GetMapping()
	public List<UserDto> getAllUser() {
		return userService.getAllUser();
	}
	
	@PutMapping()
	public UserDto updateUser(UserDto userDto) {
		return userService.updateUser(userDto);
	}
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") long userId) {
		userService.deleteUser(userId);
	}

}
