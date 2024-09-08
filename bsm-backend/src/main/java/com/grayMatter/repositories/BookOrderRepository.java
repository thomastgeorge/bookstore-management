package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.BookOrder;

	public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {

	@Query("SELECT b.book, SUM(b.quantity) as totalQuantity " +
		           "FROM BookOrder b GROUP BY b.book " +
		           "ORDER BY totalQuantity DESC")
	List<Book> findTopSellingBooks(Pageable pageable);

}
