package com.grayMatter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegUserDto {
	
	private String name;
	private String email;
	private String mobile;
	private String password;

}
