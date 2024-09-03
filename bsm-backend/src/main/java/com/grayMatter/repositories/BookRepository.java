package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grayMatter.entities.Book;

import jakarta.transaction.Transactional;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByCategoryCategoryName(String category);

	@Modifying
    @Transactional
    @Query("UPDATE Book b SET b.available = false WHERE b.id = :bookId")
    void customDelete(@Param("bookId") Long bookId);
	
	@Query("SELECT b FROM Book b " +
	           "WHERE (:name IS NULL OR b.title LIKE %:name% OR b.description LIKE %:name%) " +
	           "AND (:category IS NULL OR b.category = :category) " +
	           "AND (:minPrice IS NULL OR :maxPrice IS NULL OR (b.price BETWEEN :minPrice AND :maxPrice))")
	    List<Book> searchBook(@Param("name") String name,
	                          @Param("category") Long category,
	                          @Param("minPrice") Double minPrice,
	                          @Param("maxPrice") Double maxPrice);

	
}
