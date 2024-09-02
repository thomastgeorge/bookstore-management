package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.grayMatter.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByCategoryCategoryName(String category);

	@Modifying
    @Query("UPDATE Book b SET b.available = false WHERE b.bookId = :bookId")
    void customDelete(Long bookId);

}
