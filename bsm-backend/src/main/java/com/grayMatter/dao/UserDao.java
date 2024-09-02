package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Role;
import com.grayMatter.entities.User;
import com.grayMatter.repositories.UserRepository;

@Repository
public class UserDao {
	
	@Autowired
	private UserRepository userRepository;
	
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

}
