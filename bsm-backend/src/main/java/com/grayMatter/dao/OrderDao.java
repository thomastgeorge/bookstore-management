package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Orders;
import com.grayMatter.repositories.OrdersRepository;

@Repository
public class OrderDao {
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	public Orders getOrderById(long orderId) {
		return ordersRepository.findById(orderId).get();
	}

	public Orders addOrder(Orders orders) {
		return ordersRepository.save(orders);
	}

	public List<Orders> getOrdersByCustomerId(long customerId) {
		return ordersRepository.findByCustomerCustomerId(customerId);
	}

}
