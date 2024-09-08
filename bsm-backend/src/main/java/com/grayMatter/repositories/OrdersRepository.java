package com.grayMatter.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.grayMatter.entities.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

	List<Orders> findByCustomerCustomerId(long customerId);

	@Query("SELECT SUM(o.totalTotal) FROM Orders o WHERE o.orderDate = ?1")
	double findTodaysRevenue(Date date);

	@Query("SELECT COUNT(o.id) FROM Orders o WHERE o.orderDate = ?1")
	long countTodaysOrders(Date date);

}
