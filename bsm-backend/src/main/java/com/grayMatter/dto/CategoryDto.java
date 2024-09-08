package com.grayMatter.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
	
	private Long categoryId;
	
	@NotNull(message = "category Name cannot be null")
	private String categoryName;

}
