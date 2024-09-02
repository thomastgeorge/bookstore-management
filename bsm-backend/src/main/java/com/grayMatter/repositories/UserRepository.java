package com.grayMatter.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String username);
	
}
