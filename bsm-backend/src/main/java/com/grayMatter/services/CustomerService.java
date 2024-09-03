package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.CustomerDao;
import com.grayMatter.dao.UserDao;
import com.grayMatter.dto.CustomerDto;
import com.grayMatter.dto.CustomerMapper;
import com.grayMatter.entities.Customer;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerDao  customerDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CustomerMapper customerMapper;
	
	public CustomerDto getCustomerById(long customerId) {
		return customerMapper.mapToCustomerDto(customerDao.getCustomerById(customerId));
	}
	
	public CustomerDto getCustomerByUserId(long userId) {
		return customerMapper.mapToCustomerDto(customerDao.getCustomerByUserId(userId));
	}
	
	public List<CustomerDto> getAllCustomer(){
		List<Customer> listCustomer = customerDao.getAllCustomer();
		return listCustomer.stream()
                .map(customerMapper::mapToCustomerDto)
                .collect(Collectors.toList());
	}
	
	public CustomerDto updateCustomer(CustomerDto customerDto) {
		return customerMapper.mapToCustomerDto(customerDao.updateCustomer(customerMapper.mapToCustomer(customerDto)));
	}
	
	public void deleteCustomer(long customerId) {
		Customer customer = customerDao.getCustomerById(customerId);
		long userId = customer.getUser().getUserId();
		customerDao.deleteCustomer(customerId);
		userDao.deleteUser(userId);
	}

}
