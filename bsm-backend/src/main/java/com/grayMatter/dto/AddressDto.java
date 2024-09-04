package com.grayMatter.dto;

import com.grayMatter.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
	private Long addressId;
	private String address;
	private String city;
	private String country;
	private String pincode;
	private Customer customer;
}
