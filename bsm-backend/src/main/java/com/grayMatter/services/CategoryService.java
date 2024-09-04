package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.CategoryDao;
import com.grayMatter.dto.CategoryDto;
import com.grayMatter.dto.CategoryMapper;
import com.grayMatter.entities.Category;

@Service
public class CategoryService {

	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private CategoryMapper categoryMapper;
	
	public CategoryDto createCategory(CategoryDto categoryDto) {
		return categoryMapper.mapToCategoryDto(categoryDao.createCategory(categoryMapper.mapToCategory(categoryDto)));
	}
	
	public CategoryDto findById(long categoryId) {
		return categoryMapper.mapToCategoryDto(categoryDao.findById(categoryId));
	}
	
	public List<CategoryDto> getAllCategory(){
		List<Category> categoryList = categoryDao.getAllCategory();
		return categoryList.stream()
                .map(categoryMapper::mapToCategoryDto)
                .collect(Collectors.toList());
	}
	
	public CategoryDto updateCategory(CategoryDto categoryDto) {
		return categoryMapper.mapToCategoryDto(categoryDao.updateCategory(categoryMapper.mapToCategory(categoryDto)));
	}
	
	public void deleteCategory(long categoryId) {
		categoryDao.deleteCategory(categoryId);
	}
}
