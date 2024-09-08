package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.CustomerDto;
import com.grayMatter.exceptions.CustomerIdNotFoundException;
import com.grayMatter.exceptions.NoContentFoundException;
import com.grayMatter.exceptions.UserIdNotFoundException;
import com.grayMatter.services.CustomerService;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/{customerId}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable("customerId") long customerId) throws CustomerIdNotFoundException {
        CustomerDto customerDto = customerService.getCustomerById(customerId);
        return new ResponseEntity<>(customerDto, HttpStatus.OK);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<CustomerDto> getCustomerByUserId(@PathVariable("userId") long userId) throws UserIdNotFoundException {
        CustomerDto customerDto = customerService.getCustomerByUserId(userId);
        return new ResponseEntity<>(customerDto, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<CustomerDto>> getAllCustomer() throws NoContentFoundException {
        List<CustomerDto> customers = customerService.getAllCustomer();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PatchMapping("/{customerId}")
    public ResponseEntity<CustomerDto> updateCustomer(	@PathVariable("customerId") long customerId,
    													@RequestBody CustomerDto customerDto) throws CustomerIdNotFoundException {
        CustomerDto updatedCustomer = customerService.updateCustomer(customerId, customerDto);
        return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable("customerId") long customerId) throws CustomerIdNotFoundException{
        try {
            customerService.deleteCustomer(customerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalCustomers() {
        long count = customerService.getTotalCustomers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CustomerDto>> searchCustomer(@RequestParam String param) {
        List<CustomerDto> customers = customerService.searchCustomer(param);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

}
