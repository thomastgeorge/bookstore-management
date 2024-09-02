package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.CustomerDto;
import com.grayMatter.services.CustomerService;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/{customerId}")
	public CustomerDto getCustomerById(@PathVariable("customerId") long customerId) {
		return customerService.getCustomerById(customerId);
	}
	
	@GetMapping("/userId/{userId}")
	public CustomerDto getCustomerByUserId(@PathVariable("userId") long userId) {
		return customerService.getCustomerByUserId(userId);
	}
	
	@GetMapping()
	public List<CustomerDto> getAllCustomer(){
		return customerService.getAllCustomer();
	}
	
	@PutMapping()
	public CustomerDto updateCustomer(@RequestBody CustomerDto customerDto) {
		return customerService.updateCustomer(customerDto);
	}
	
	@DeleteMapping("/{customerId}")
	public void deleteCustomer(@PathVariable("customerId") long customerId) {
		customerService.deleteCustomer(customerId);
	}

}
