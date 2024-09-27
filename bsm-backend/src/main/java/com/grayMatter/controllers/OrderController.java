package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.OrdersDto;
import com.grayMatter.exceptions.AddressIdNotFoundException;
import com.grayMatter.exceptions.CustomerIdNotFoundException;
import com.grayMatter.exceptions.NoContentFoundException;
import com.grayMatter.exceptions.OrderIdNotFoundException;
import com.grayMatter.services.OrderService;


@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	@GetMapping
    public ResponseEntity<List<OrdersDto>> listAllOrders() throws NoContentFoundException {
        List<OrdersDto> books = orderService.listAllOrders();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
	
	@GetMapping("/{orderId}")
    public ResponseEntity<OrdersDto> getOrderById(@PathVariable long orderId) throws OrderIdNotFoundException {
        OrdersDto orderDto = orderService.getOrderById(orderId);
        return new ResponseEntity<>(orderDto, HttpStatus.OK);
    }

    @PostMapping("/create/{customerId}/{addressId}")
    public ResponseEntity<OrdersDto> addOrder(@PathVariable long customerId,
                                              @PathVariable Long addressId,
                                              @RequestBody OrdersDto ordersDto) throws CustomerIdNotFoundException, AddressIdNotFoundException {
        OrdersDto createdOrder = orderService.addOrder(customerId, addressId, ordersDto);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrdersDto>> getOrdersByCustomerId(@PathVariable long customerId) throws CustomerIdNotFoundException {
        List<OrdersDto> orders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOrderCount() throws NoContentFoundException {
        long count = orderService.getOrderCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/todays/count")
    public ResponseEntity<Long> getTodaysOrderCount() throws NoContentFoundException {
        long todaysCount = orderService.getTodaysOrderCount();
        return new ResponseEntity<>(todaysCount, HttpStatus.OK);
    }

    @GetMapping("/total/revenue")
    public ResponseEntity<Double> getTotalRevenue() throws NoContentFoundException {
        Double totalRevenue = orderService.getTotalRevenue();
        return new ResponseEntity<>(totalRevenue, HttpStatus.OK);
    }

    @GetMapping("/todays/revenue")
    public ResponseEntity<Double> getTodaysRevenue() throws NoContentFoundException {
        Double todaysRevenue = orderService.getTodaysRevenue();
        return new ResponseEntity<>(todaysRevenue, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<OrdersDto>> searchOrders(
            @RequestParam(value = "orderId", required = false) Long orderId,
            @RequestParam(value = "param", required = false) String param) throws OrderIdNotFoundException {
        List<OrdersDto> orders = orderService.searchOrders(orderId, param);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}
