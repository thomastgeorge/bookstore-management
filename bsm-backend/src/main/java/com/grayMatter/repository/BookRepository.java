package com.grayMatter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	
//	@Query("SELECT b FROM Book b WHERE b.isDeleted = false")
//    List<Book> findAllActiveBooks();
//	
//	
////	@Filter(name = "deletedFilter", condition = "is_deleted = false")
////  
}
