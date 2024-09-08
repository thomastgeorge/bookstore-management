package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.UserDao;
import com.grayMatter.dto.ChangePassword;
import com.grayMatter.dto.ForgotPasswordDto;
import com.grayMatter.dto.UserDto;
import com.grayMatter.dto.UserMapper;
import com.grayMatter.entities.User;

@Service
public class UserService implements UserServiceInterface {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public UserDto getUserById(long userId) {
		return userMapper.mapToUserDto(userDao.getUserById(userId));
	}
	
	@Override
	public List<UserDto> getAllUser() {
		List<User> userList = userDao.getAllUser();
		return userList.stream()
                .map(userMapper::mapToUserDto)
                .collect(Collectors.toList());
	}
	
	@Override
	public UserDto updateUser(long userId, UserDto userDto) {
		User existingUser = userDao.getUserById(userId);
		if(userDto.getEmail() != null) {
			existingUser.setEmail(userDto.getEmail());
		}
		return userMapper.mapToUserDto(userDao.updateUser(existingUser));
	}
	
	@Override
	public void deleteUser(long userId) {
		userDao.deleteUser(userId);
	}

	@Override
	public UserDto updatePassword(long userId, ChangePassword changePassword) {
		return userMapper.mapToUserDto(userDao.updatePassword(userId, changePassword));
	}

	public UserDto updatePasswordLoginForgot(String emailId, ForgotPasswordDto forgotPassword) {
		// TODO Auto-generated method stub
		return userMapper.mapToUserDto(userDao.updatePasswordLoginForgot(emailId, forgotPassword));
	}

}
