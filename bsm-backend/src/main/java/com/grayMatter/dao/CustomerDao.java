package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Customer;
import com.grayMatter.repositories.CustomerRepository;

@Repository
public class CustomerDao {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer getCustomerById(long customerId) {
		return customerRepository.findById(customerId).get();
	}
	
	public Customer getCustomerByUserId(long userId) {
		return customerRepository.findByUserUserId(userId);
	}
	
	public List<Customer> getAllCustomer(){
		return customerRepository.findAll();
	}
	
	public Customer updateCustomer(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public void deleteCustomer(long customerId) {
		customerRepository.deleteById(customerId);
	}

	public long count() {
		return customerRepository.count();
	}
	
	public List<Customer> searchCustomer(String param){
		return customerRepository.findByAnyField(param);
	}

}
