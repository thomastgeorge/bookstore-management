package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByCategoryCategoryName(String category);

	void customDelete(Long bookId);

}
