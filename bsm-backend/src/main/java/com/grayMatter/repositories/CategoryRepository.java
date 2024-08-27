package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
