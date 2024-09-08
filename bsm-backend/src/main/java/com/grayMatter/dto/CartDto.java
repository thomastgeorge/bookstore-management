package com.grayMatter.dto;

import javax.validation.constraints.Min;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
	
	private Long cartId;
	
	@Min(value = 1, message = "quantity must be positive")
	private int quantity;
	
	private Customer customer;
	private Book book;

}
