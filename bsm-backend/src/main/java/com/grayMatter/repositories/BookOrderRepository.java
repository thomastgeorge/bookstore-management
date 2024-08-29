package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.BookOrder;

public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {

	
	@Query("SELECT b FROM Book b JOIN BookOrder bo ON b.bookId = bo.book.bookId " +
	           "GROUP BY b.bookId ORDER BY SUM(bo.quantity) DESC")
	List<Book> findBestSellingBooks();

}
