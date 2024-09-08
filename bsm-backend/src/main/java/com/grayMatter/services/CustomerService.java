package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.CustomerDao;
import com.grayMatter.dto.CustomerDto;
import com.grayMatter.dto.CustomerMapper;
import com.grayMatter.entities.Customer;

@Service
public class CustomerService implements CustomerServiceInterface {
	
	@Autowired
	private CustomerDao  customerDao;
	
	@Autowired
	private CustomerMapper customerMapper;
	
	@Override
	public CustomerDto getCustomerById(long customerId) {
		return customerMapper.mapToCustomerDto(customerDao.getCustomerById(customerId));
	}
	
	@Override
	public CustomerDto getCustomerByUserId(long userId) {
		return customerMapper.mapToCustomerDto(customerDao.getCustomerByUserId(userId));
	}
	
	@Override
	public List<CustomerDto> getAllCustomer(){
		List<Customer> listCustomer = customerDao.getAllCustomer();
		return listCustomer.stream()
                .map(customerMapper::mapToCustomerDto)
                .collect(Collectors.toList());
	}
	
	@Override
	public CustomerDto updateCustomer(long customerId, CustomerDto customerDto) {
		Customer existingCustomer = customerDao.getCustomerById(customerId);
		     
	    if (customerDto.getName() != null) {
	        existingCustomer.setName(customerDto.getName());
	    }
	    
	    if (customerDto.getMobile() != null) {
	        existingCustomer.setMobile(customerDto.getMobile());
	    }
	    
		return customerMapper.mapToCustomerDto(customerDao.updateCustomer(existingCustomer));
	}
	
	public void deleteCustomer(long customerId) {
		customerDao.deleteCustomer(customerId);
	}

	@Override
	public long getTotalCustomers() {
        return customerDao.count();
    }
	
	@Override
	public List<CustomerDto> searchCustomer(String param){
		List<Customer> customerList = customerDao.searchCustomer(param);
		return customerList.stream()
                .map(customerMapper::mapToCustomerDto)
                .collect(Collectors.toList());
	}

}
