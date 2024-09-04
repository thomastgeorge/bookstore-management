package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Customer;

@Component
public class CustomerMapper {
	
	public CustomerDto mapToCustomerDto(Customer customer) {
		return new CustomerDto(
				customer.getCustomerId(),
				customer.getName(),
				customer.getMobile(),
				customer.getRegisteredOn(),
				customer.getUser()
				);
	}
	
	public Customer mapToCustomer(CustomerDto customerDto) {
		return new Customer(
				customerDto.getCustomerId(),
				customerDto.getName(),
				customerDto.getMobile(),
				customerDto.getRegisteredOn(),
				customerDto.getUser()
				);
	}

}
