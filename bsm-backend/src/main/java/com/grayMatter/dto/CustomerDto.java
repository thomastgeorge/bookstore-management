package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import com.grayMatter.entities.Cart;
import com.grayMatter.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
	
	private Long customerId;
	private String name;
	private String mobile;
	private Date registeredOn;
	private User user;
	private List<Cart> cart;

}
