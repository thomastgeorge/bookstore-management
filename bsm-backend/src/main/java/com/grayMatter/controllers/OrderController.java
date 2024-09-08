package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.OrdersDto;
import com.grayMatter.services.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/{orderId}")
	public OrdersDto getOrderById(@PathVariable long orderId) {
		return orderService.getOrderById(orderId);
	}
	
	@PostMapping("/create/{customerId}/{addressId}")
	public OrdersDto addOrder(	@PathVariable long customerId,
								@PathVariable Long addressId,
            					@RequestBody OrdersDto ordersDto) {
		return orderService.addOrder(customerId, addressId, ordersDto);
	}
	
	@GetMapping("/customer/{customerId}")
	public List<OrdersDto> getOrdersByCustomerId(@PathVariable long customerId){
		return orderService.getOrdersByCustomerId(customerId);
	}

}
