package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Orders;

@Component
public class OrdersMapper {
	
	public OrdersDto mapToOrdersDto(Orders orders) {
		return new OrdersDto(
				orders.getOrderId(),
				orders.getOrderDate(),
				orders.getTotalTotal(),
				orders.getPaymentMethod(),
				orders.getAddress(),
				orders.getCustomer(),
				orders.getBookorder()
				);
	}
	
	public Orders mapToOrders(OrdersDto ordersDto) {
		return new Orders(
				ordersDto.getOrderId(),
				ordersDto.getOrderDate(),
				ordersDto.getTotalTotal(),
				ordersDto.getPaymentMethod(),
				ordersDto.getAddress(),
				ordersDto.getCustomer(),
				ordersDto.getBookorder()
				);
	}

}
