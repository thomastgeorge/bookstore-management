package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
	@DecimalMin(value = "0.0", inclusive = true, message = "Total must be zero or positive")
    private double totalTotal;

    @NotNull(message = "Payment method cannot be null")
    @Size(min = 1, max = 50, message = "Payment method must be between 1 and 50 characters long")
    private String paymentMethod;
	private Address address;
	private Customer customer;
	private List<BookOrder> bookorder;

}
