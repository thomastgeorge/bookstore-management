package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import com.grayMatter.entities.Address;
import com.grayMatter.entities.BookOrder;
import com.grayMatter.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDto {
	
	private Long orderId;
	private Date orderDate;
	private double totalTotal;
	private String paymentMethod;
	private Address address;
	private Customer customer;
	private List<BookOrder> bookorder;

}
