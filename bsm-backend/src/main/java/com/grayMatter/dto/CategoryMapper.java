package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Category;

@Component
public class CategoryMapper {

	public CategoryDto mapToCategoryDto(Category category) {
		return new CategoryDto(
				category.getCategoryId(),
				category.getCategoryName()
				);
	}
	
	public Category mapToCategory(CategoryDto categoryDto) {
		return new Category(
				categoryDto.getCategoryId(),
				categoryDto.getCategoryName()
				);
	}
	
}
