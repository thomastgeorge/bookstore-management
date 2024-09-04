package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Address;

@Component
public class AddressMapper {
	
	public AddressDto mapToAddressDto(Address address) {
		return new AddressDto(
				address.getAddressId(),
				address.getAddress(),
				address.getCity(),
				address.getCountry(),
				address.getPincode(),
				address.getCustomer()
				);
	}
	
	public Address mapToAddress(AddressDto addressDto) {
		return new Address(
				addressDto.getAddressId(),
				addressDto.getAddress(),
				addressDto.getCity(),
				addressDto.getCountry(),
				addressDto.getPincode(),
				addressDto.getCustomer()
				);
	}

}
