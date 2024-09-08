package com.grayMatter.dto;

import javax.validation.constraints.Min;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookOrderDto {
	
	private Long bookOrderId;
	@Min(value = 0, message = "Quantity must be zero or positive")
    private int quantity;

    @Min(value = 0, message = "Subtotal must be zero or positive")
    private int subTotal;
	private Book book;
	private Orders orders;

}
