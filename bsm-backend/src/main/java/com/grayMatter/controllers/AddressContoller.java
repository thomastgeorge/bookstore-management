package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.AddressDto;
import com.grayMatter.services.AddressService;

@RestController
@RequestMapping("/api/va/address")
public class AddressContoller {
	
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/create/{customerId}")
	public AddressDto createAddess(@PathVariable("customerId") long customerId, @RequestBody AddressDto addressDto) {
		return addressService.createAddess(customerId, addressDto);
	}
	
	@GetMapping("/{addressId}")
	public AddressDto getById(@PathVariable("addressId") long addressId) {
		return addressService.getById(addressId);
	}
	
	@GetMapping("/customerId/{customerId}")
	public List<AddressDto> getByCustomerId(@PathVariable("customerId") long customerId){
		return addressService.getByCustomerId(customerId);
	}
	
	@PutMapping("/update/{customerId}")
	public AddressDto updateAddress(@PathVariable("customerId") long customerId, @RequestBody AddressDto addressDto) {
		return addressService.updateAddress(customerId, addressDto);
	}
	
	@DeleteMapping("/{addressId}")
	public void deleteAddress(@PathVariable("addressId") long addressId) {
		addressService.deleteAddress(addressId);		
	}

}
