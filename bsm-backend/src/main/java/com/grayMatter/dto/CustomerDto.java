package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.grayMatter.entities.Cart;
import com.grayMatter.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
	
	private Long customerId;
	
	@NotNull(message = "name cannot be null")
	
	@NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters long")
    private String name;

    @NotNull(message = "Mobile number cannot be null")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Mobile number must be a valid international phone number")
    private String mobile;
    
	private Date registeredOn;
	private User user;

}
