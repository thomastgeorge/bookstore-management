package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.AddressDto;

public interface AddressServiceInterface {
	
	AddressDto createAddress(long customerId, AddressDto addressDto);
    
    AddressDto getById(long addressId);
    
    List<AddressDto> getByCustomerId(long customerId);
    
    AddressDto updateAddress(long customerId, AddressDto addressDto);
    
    void deleteAddress(long addressId);

}
