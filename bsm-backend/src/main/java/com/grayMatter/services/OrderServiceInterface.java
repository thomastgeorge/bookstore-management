package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.OrdersDto;

public interface OrderServiceInterface {

	OrdersDto getOrderById(long orderId);
    
    OrdersDto addOrder(long customerId, Long addressId, OrdersDto ordersDto);
    
    List<OrdersDto> getOrdersByCustomerId(long customerId);
    
    long getOrderCount();
    
    long getTodaysOrderCount();
    
    double getTotalRevenue();
    
    Double getTodaysRevenue();
    
}
