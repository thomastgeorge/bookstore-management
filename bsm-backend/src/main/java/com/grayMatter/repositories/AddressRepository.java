package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

	List<Address> findByCustomerCustomerId(long customerId);

}
