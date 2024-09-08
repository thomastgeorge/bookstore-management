package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.CategoryDto;

public interface CategoryServiceInterface {
	
	CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto findById(long categoryId);

    List<CategoryDto> getAllCategory();

    CategoryDto updateCategory(CategoryDto categoryDto);

    void deleteCategory(long categoryId);

}
