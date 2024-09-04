package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.AddressDao;
import com.grayMatter.dto.AddressDto;
import com.grayMatter.dto.AddressMapper;
import com.grayMatter.entities.Address;


@Service
public class AddressService {
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private AddressMapper addressMapper;
	
	public AddressDto createAddess(long customerId, AddressDto addressDto) {
		return addressMapper.mapToAddressDto(addressDao.createAddess(customerId, addressMapper.mapToAddress(addressDto)));
	}
	
	public AddressDto getById(long addressId) {
		return addressMapper.mapToAddressDto(addressDao.getById(addressId));
	}
	
	public List<AddressDto> getByCustomerId(long customerId){
		List<Address> addressList = addressDao.getByCustomerId(customerId);
		return addressList.stream()
				 .map(addressMapper::mapToAddressDto)
	             .collect(Collectors.toList());
	}
	
	public AddressDto updateAddress(long customerId, AddressDto addressDto) {
		return addressMapper.mapToAddressDto(addressDao.updateAddress(customerId, addressMapper.mapToAddress(addressDto)));
	}
	
	public void deleteAddress(long addressId) {
		addressDao.deleteAddress(addressId);
	}

}
