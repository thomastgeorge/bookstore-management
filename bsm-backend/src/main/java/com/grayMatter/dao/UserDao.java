package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.grayMatter.dto.ChangePassword;
import com.grayMatter.dto.ForgotPasswordDto;
import com.grayMatter.entities.Role;
import com.grayMatter.entities.User;
import com.grayMatter.repositories.UserRepository;

@Repository
public class UserDao {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	public User getUserById(long userId) {
		return userRepository.findById(userId).get();
	}
	
	public List<User> getAllUser(){
		return userRepository.findAll();
	}
	
	public User updateUser(User user) {
		return userRepository.save(user);
	}
	
	public void deleteUser(long userId) {
		User user = userRepository.findById(userId).get();
		if (user.getRole() == Role.ADMIN) {
		    return;
		}
		userRepository.deleteById(userId);
	}

	public User updatePassword(long userId, ChangePassword changePassword) {
		User existingUser = userRepository.findById(userId).get();
		
		if(changePassword.getNewPassword() != null && !changePassword.getNewPassword().isEmpty()) {
			
			// Validate the current password
	        if (!passwordEncoder.matches(changePassword.getCurrentPassword(), existingUser.getPassword())) {
	            throw new RuntimeException("Current password is incorrect");
	        }
	        String encodedNewPassword = passwordEncoder.encode(changePassword.getNewPassword());
			existingUser.setPassword(encodedNewPassword);
		}
		return userRepository.save(existingUser);
	}

	public User updatePasswordLoginForgot(String emailId, ForgotPasswordDto forgotPassword) {
		User existingUser = userRepository.findByEmail(emailId).get();
		if(forgotPassword.getNewPassword() != null && !forgotPassword.getNewPassword().isEmpty()) {
			String encodedNewPassword = passwordEncoder.encode(forgotPassword.getNewPassword());
			existingUser.setPassword(encodedNewPassword);
		}
		return userRepository.save(existingUser);
	}

}
