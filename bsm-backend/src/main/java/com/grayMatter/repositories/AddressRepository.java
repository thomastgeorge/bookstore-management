package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
