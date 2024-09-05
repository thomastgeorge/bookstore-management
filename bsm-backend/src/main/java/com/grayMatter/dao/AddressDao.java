package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Address;
import com.grayMatter.entities.Customer;
import com.grayMatter.repositories.AddressRepository;
import com.grayMatter.repositories.CustomerRepository;

@Repository
public class AddressDao {
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public Address createAddess(long customerId, Address address) {
		Customer customer = customerRepository.findById(customerId).get();
		address.setCustomer(customer);
		return addressRepository.save(address);
	}
	
	public Address getById(long addressId) {
		return addressRepository.findById(addressId).get();
	}
	
	public List<Address> getByCustomerId(long customerId){
		return addressRepository.findByCustomerCustomerId(customerId);
	}
	
	public Address updateAddress(long customerId, Address address) {
		Address currentAddress = addressRepository.findById(address.getAddressId()).get();
		if(currentAddress == null)
			return null;
		Customer customer = customerRepository.findById(customerId).get();
		address.setCustomer(customer);
		return addressRepository.save(address);
	}
	
	public void deleteAddress(long addressId) {
		addressRepository.deleteById(addressId);
	}

}
