package com.grayMatter.dto;

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
	private int quantity;
	private Customer customer;
	private Book book;

}
