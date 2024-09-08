package com.grayMatter.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDto {
	@NotBlank(message = "newPassword cannot be blank")
	private String newPassword;
}
