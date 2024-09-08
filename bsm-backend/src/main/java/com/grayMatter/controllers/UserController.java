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
import com.grayMatter.exceptions.NoContentFoundException;
import com.grayMatter.exceptions.UserIdNotFoundException;
import com.grayMatter.services.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId") long userId) throws UserIdNotFoundException {
        UserDto userDto = userService.getUserById(userId);
        if (userDto != null) {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUser() throws NoContentFoundException {
        List<UserDto> users = userService.getAllUser();
        if (users != null && !users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(	@PathVariable("userId") long userId,
    											@RequestBody UserDto userDto) throws UserIdNotFoundException {
        UserDto updatedUser = userService.updateUser(userId, userDto);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") long userId) throws UserIdNotFoundException {
        userService.deleteUser(userId);
    }

    @PatchMapping("/updatePassword/{userId}")
    public ResponseEntity<UserDto> updatePassword(	@PathVariable("userId") long userId,
    												@RequestBody ChangePassword changePassword) throws UserIdNotFoundException {
        UserDto updatedUser = userService.updatePassword(userId, changePassword);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PatchMapping("/updatePasswordLogin/{emailId}")
    public ResponseEntity<UserDto> updatePasswordLoginForgot(@PathVariable("emailId") String emailId,
    														@RequestBody ForgotPasswordDto forgotPassword) throws UserIdNotFoundException {
        UserDto updatedUser = userService.updatePasswordLoginForgot(emailId, forgotPassword);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

}
