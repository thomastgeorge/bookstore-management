package com.grayMatter.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.grayMatter.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
	
    private Long addressId;

    @NotNull(message = "Address cannot be null")
    @Size(min = 1, max = 255, message = "Address must be between 1 and 255 characters long")
    private String address;

    @NotNull(message = "City cannot be null")
    @Size(min = 1, max = 100, message = "City must be between 1 and 100 characters long")
    private String city;

    @NotNull(message = "Country cannot be null")
    @Size(min = 1, max = 100, message = "Country must be between 1 and 100 characters long")
    private String country;

    @NotNull(message = "Pincode cannot be null")
    @Pattern(regexp = "^[0-9]{5,6}$", message = "Pincode must be 5 or 6 digits long")
    private String pincode;
    
	private Customer customer;
}
