package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	public Customer findByUserUserId(long userId);

}
