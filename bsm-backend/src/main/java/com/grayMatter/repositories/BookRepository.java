package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
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
		       "WHERE (:query IS NULL OR b.title LIKE %:query% OR b.description LIKE %:query% " +
		       "OR b.author LIKE %:query% OR b.category.categoryName = :query)"+
		       "AND (:category IS NULL OR b.category.categoryId = :category) " +
		       "AND (:minPrice IS NULL OR :maxPrice IS NULL OR (b.price BETWEEN :minPrice AND :maxPrice))")
	List<Book> searchBook(@Param("query") String query,
	                      @Param("category") Long category,
	                      @Param("minPrice") Double minPrice,
	                      @Param("maxPrice") Double maxPrice);

	 @Query("SELECT b FROM Book b ORDER BY publishedDate DESC LIMIT :limit")
	 List<Book> newArrivals(@Param("limit") int limit);
	 
	 List<Book> findAllByOrderByAvgRatingDesc(Pageable pageable);

	 List<Book> findAllByBookIdIn(List<Long> bookIds);
	
}
