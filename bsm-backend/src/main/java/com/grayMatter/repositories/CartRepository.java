package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findByCustomerCustomerId(long customerId);
	
	boolean existsByCustomerCustomerIdAndBookBookId(Long customerId, long bookId);

}
