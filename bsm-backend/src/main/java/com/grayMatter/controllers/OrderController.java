package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<OrdersDto> getOrderById(@PathVariable long orderId) {
        OrdersDto orderDto = orderService.getOrderById(orderId);
        if (orderDto != null) {
            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create/{customerId}/{addressId}")
    public ResponseEntity<OrdersDto> addOrder(@PathVariable long customerId,
                                              @PathVariable Long addressId,
                                              @RequestBody OrdersDto ordersDto) {
        OrdersDto createdOrder = orderService.addOrder(customerId, addressId, ordersDto);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrdersDto>> getOrdersByCustomerId(@PathVariable long customerId) {
        List<OrdersDto> orders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOrderCount() {
        long count = orderService.getOrderCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/todays/count")
    public ResponseEntity<Long> getTodaysOrderCount() {
        long todaysCount = orderService.getTodaysOrderCount();
        return new ResponseEntity<>(todaysCount, HttpStatus.OK);
    }

    @GetMapping("/total/revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        double totalRevenue = orderService.getTotalRevenue();
        return new ResponseEntity<>(totalRevenue, HttpStatus.OK);
    }

    @GetMapping("/todays/revenue")
    public ResponseEntity<Double> getTodaysRevenue() {
        double todaysRevenue = orderService.getTodaysRevenue();
        return new ResponseEntity<>(todaysRevenue, HttpStatus.OK);
    }

}
