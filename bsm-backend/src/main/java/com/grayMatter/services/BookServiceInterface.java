package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.BookDto;

public interface BookServiceInterface {
	
	BookDto createBook(BookDto bookDto, long categoryId);

    List<BookDto> listAllBooks();

    BookDto editBook(long bookId, BookDto bookDto, long cid);

    void deleteBook(long bookId);

    BookDto getBookById(long bookId);

    List<BookDto> listBooksByCategory(String category);

    List<BookDto> searchBook(String query, Long category, Double minPrice, Double maxPrice, String userRole);

    List<BookDto> newArrivals(int limit);

    List<BookDto> getTopRatedBooks(int limit);

    long getTotalBooks();

	List<BookDto> getTopSellingBooks(int limit);
	
}
