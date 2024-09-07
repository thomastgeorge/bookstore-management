package com.grayMatter.dto;

import com.grayMatter.entities.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookOrderDto {
	
	private Long bookOrderId;
	private int quantity;
	private int subTotal;
	private Book book;

}
