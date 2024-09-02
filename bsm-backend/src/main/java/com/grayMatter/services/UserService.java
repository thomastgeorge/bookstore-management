package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.grayMatter.dao.UserDao;
import com.grayMatter.dto.UserDto;
import com.grayMatter.dto.UserMapper;
import com.grayMatter.entities.User;

public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserMapper userMapper;
	
	public UserDto getUserById(long userId) {
		return userMapper.mapToUserDto(userDao.getUserById(userId));
	}
	
	public List<UserDto> getAllUser() {
		List<User> userList = userDao.getAllUser();
		return userList.stream()
                .map(userMapper::mapToUserDto)
                .collect(Collectors.toList());
	}
	
	public UserDto updateUser(UserDto userDto) {
		return userMapper.mapToUserDto(userDao.updateUser(userMapper.mapToUser(userDto)));
	}
	
	public void deleteUser(long userId) {
		userDao.deleteUser(userId);
	}

}
