package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.ChangePassword;
import com.grayMatter.dto.ForgotPasswordDto;
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
	
	@PatchMapping("/{userId}")
	public UserDto updateUser(@PathVariable("userId") long userId, @RequestBody UserDto userDto) {
		return userService.updateUser(userId, userDto);
	}
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") long userId) {
		userService.deleteUser(userId);
	}
	
	@PatchMapping("/updatePassword/{userId}")
	public UserDto updatePassword(@PathVariable("userId") long userId, @RequestBody ChangePassword changePassword) {
		return userService.updatePassword(userId, changePassword);
	}
	@PatchMapping("/updatePasswordLogin/{emailId}")
	public UserDto updatePasswordLoginForgot(@PathVariable("emailId") String emailId, @RequestBody ForgotPasswordDto forgotPassword) {
		return userService.updatePasswordLoginForgot(emailId, forgotPassword);
	}

}
