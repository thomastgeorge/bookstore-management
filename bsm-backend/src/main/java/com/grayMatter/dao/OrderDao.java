package com.grayMatter.dao;

import java.sql.Date;
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

	public long getOrderCount() {
		return ordersRepository.count();
	}

	public long getTodaysOrderCount() {
		return ordersRepository.countTodaysOrders(new Date(System.currentTimeMillis()));
	}

	public double getTotalRevenue() {
		return ordersRepository.findAll().stream()
                .mapToDouble(order -> order.getTotalTotal())
                .sum();
	}

	public Double getTodaysRevenue() {
		return ordersRepository.findTodaysRevenue(new Date(System.currentTimeMillis()));
	}

	public List<Orders> listAllOrders() {
		return ordersRepository.findAll();
	}
	 public List<Orders> searchOrders(Long orderId, String param) {
	        return ordersRepository.searchOrders(orderId, param);
	       
	        
	    }

}
