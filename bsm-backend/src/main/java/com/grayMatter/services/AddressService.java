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
public class AddressService implements AddressServiceInterface {
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private AddressMapper addressMapper;
	
	@Override
	public AddressDto createAddress(long customerId, AddressDto addressDto) {
		return addressMapper.mapToAddressDto(addressDao.createAddess(customerId, addressMapper.mapToAddress(addressDto)));
	}
	
	@Override
	public AddressDto getById(long addressId) {
		return addressMapper.mapToAddressDto(addressDao.getById(addressId));
	}
	
	@Override
	public List<AddressDto> getByCustomerId(long customerId){
		List<Address> addressList = addressDao.getByCustomerId(customerId);
		return addressList.stream()
				 .map(addressMapper::mapToAddressDto)
	             .collect(Collectors.toList());
	}
	
	@Override
	public AddressDto updateAddress(long customerId, AddressDto addressDto) {
		return addressMapper.mapToAddressDto(addressDao.updateAddress(customerId, addressMapper.mapToAddress(addressDto)));
	}
	
	@Override
	public void deleteAddress(long addressId) {
		addressDao.deleteAddress(addressId);
	}

}
