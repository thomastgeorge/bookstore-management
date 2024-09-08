package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

	List<Orders> findByCustomerCustomerId(long customerId);

}
