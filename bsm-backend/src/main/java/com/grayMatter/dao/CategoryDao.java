package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Category;
import com.grayMatter.repositories.CategoryRepository;

@Repository
public class CategoryDao {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Category createCategory(Category category) {
		return categoryRepository.save(category);
	}
	
	public Category findById(long categoryId) {
		return categoryRepository.findById(categoryId).get();
	}
	
	public List<Category> getAllCategory(){
		return categoryRepository.findAll();
	}
	
	public Category updateCategory(Category category) {
		Category existingCategory = categoryRepository.findById(category.getCategoryId()).get();
		if(existingCategory == null)
			return null;
		return categoryRepository.save(category);
	}
	
	public void deleteCategory(long categoryId) {
		categoryRepository.deleteById(categoryId);
	}

}
