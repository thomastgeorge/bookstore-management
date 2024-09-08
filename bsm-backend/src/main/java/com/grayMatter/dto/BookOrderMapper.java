package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.BookOrder;

@Component
public class BookOrderMapper {
	
	public BookOrderDto mapToBookOrderDto(BookOrder bookOrder) {
		return new BookOrderDto(
				bookOrder.getBookOrderId(),
				bookOrder.getQuantity(),
				bookOrder.getSubTotal(),
				bookOrder.getBook(),
				bookOrder.getOrders()
				);
	}
	
	public BookOrder  mapToOrder(BookOrderDto bookOrderDto) {
		return new BookOrder(
				bookOrderDto.getBookOrderId(),
				bookOrderDto.getQuantity(),
				bookOrderDto.getSubTotal(),
				bookOrderDto.getBook(),
				bookOrderDto.getOrders()
				);
	}

}
