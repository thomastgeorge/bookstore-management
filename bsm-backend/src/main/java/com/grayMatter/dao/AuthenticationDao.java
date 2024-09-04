package com.grayMatter.dao;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.grayMatter.dto.LoginUserDto;
import com.grayMatter.dto.RegUserDto;
import com.grayMatter.entities.Customer;
import com.grayMatter.entities.Role;
import com.grayMatter.entities.User;
import com.grayMatter.repositories.CustomerRepository;
import com.grayMatter.repositories.UserRepository;

@Repository
public class AuthenticationDao {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User signUp(RegUserDto regUserDto) {
		User user = new User();
		user.setEmail(regUserDto.getEmail());
		user.setPassword(passwordEncoder.encode(regUserDto.getPassword()));
		Role role = Role.valueOf("USER");
		user.setRole(role);
		User savedUser = userRepository.save(user);
		
		Customer customer = new Customer();
		customer.setName(regUserDto.getName());
		customer.setMobile(regUserDto.getMobile());
		customer.setRegisteredOn(new Date(System.currentTimeMillis()));
		customer.setUser(savedUser);
		customerRepository.save(customer);
		
		return savedUser;
	}
	
	public User login(LoginUserDto loginUserDto) {
		return userRepository.findByEmail(loginUserDto.getEmail()).get();
	}

}
