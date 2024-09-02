package com.grayMatter.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.grayMatter.configuration.UserPrincipal;
import com.grayMatter.entities.User;
import com.grayMatter.repositories.UserRepository;

@Service
public class MyUserDeatilsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username).get();
		if(user==null)
			throw new UsernameNotFoundException(username);

		return new UserPrincipal(user);
	}

}