package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.CategoryDto;
import com.grayMatter.services.CategoryService;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("")
	public CategoryDto createCategory(@RequestBody CategoryDto categoryDto) {
		return categoryService.createCategory(categoryDto);
	}
	
	@GetMapping("/{categoryId}")
	public CategoryDto findById(@PathVariable("categoryId") long categoryId) {
		return categoryService.findById(categoryId);
	}
	
	@GetMapping("")
	public List<CategoryDto> getAllCategory(){
		return categoryService.getAllCategory();
	}
	
	@PutMapping("")
	public CategoryDto updateCategory(@RequestBody CategoryDto categoryDto) {
		return categoryService.updateCategory(categoryDto);
	}
	
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") long categoryId) {
		categoryService.deleteCategory(categoryId);
	}

}
