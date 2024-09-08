package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/v1/address")
public class AddressContoller {
	
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/create/{customerId}")
    public ResponseEntity<AddressDto> createAddress(@PathVariable("customerId") long customerId, @RequestBody AddressDto addressDto) {
        AddressDto createdAddress = addressService.createAddress(customerId, addressDto);
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressDto> getById(@PathVariable("addressId") long addressId) {
        AddressDto addressDto = addressService.getById(addressId);
        if (addressDto != null) {
            return new ResponseEntity<>(addressDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/customerId/{customerId}")
    public ResponseEntity<List<AddressDto>> getByCustomerId(@PathVariable("customerId") long customerId) {
        List<AddressDto> addressList = addressService.getByCustomerId(customerId);
        if (addressList != null && !addressList.isEmpty()) {
            return new ResponseEntity<>(addressList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/update/{customerId}")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable("customerId") long customerId, @RequestBody AddressDto addressDto) {
        AddressDto updatedAddress = addressService.updateAddress(customerId, addressDto);
        if (updatedAddress != null) {
            return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{addressId}")
	public void deleteAddress(@PathVariable("addressId") long addressId) {
		addressService.deleteAddress(addressId);		
	}

}
