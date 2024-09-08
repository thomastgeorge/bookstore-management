package com.grayMatter.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegUserDto {
	
	@NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters long")
    private String name;

    @NotNull(message = "Email cannot be null")
    @Pattern(regexp = "^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,4}$", message = "Email must be a valid email address")
    private String email;

    @NotNull(message = "Mobile number cannot be null")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Mobile number must be a valid international phone number")
    private String mobile;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters long")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$", message = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
    private String password;

}
