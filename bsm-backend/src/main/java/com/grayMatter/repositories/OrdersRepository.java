package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

}
