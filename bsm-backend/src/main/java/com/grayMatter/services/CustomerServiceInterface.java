package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.CustomerDto;

public interface CustomerServiceInterface {
	
	CustomerDto getCustomerById(long customerId);

    CustomerDto getCustomerByUserId(long userId);

    List<CustomerDto> getAllCustomer();

    CustomerDto updateCustomer(long customerId, CustomerDto customerDto);

    void deleteCustomer(long customerId);

    long getTotalCustomers();

    List<CustomerDto> searchCustomer(String param);

}
