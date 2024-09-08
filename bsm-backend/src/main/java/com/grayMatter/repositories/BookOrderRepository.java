package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.BookOrder;

	public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {

//	@Query("SELECT b FROM Book b JOIN BookOrder bo ON b.bookId = bo.book.bookId " +
//	           "GROUP BY b.bookId ORDER BY SUM(bo.quantity) DESC")
//	List<Book> findBestSellingBooks();

}
