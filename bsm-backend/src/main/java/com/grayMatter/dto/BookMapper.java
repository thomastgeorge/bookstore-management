package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Book;

@Component
public class BookMapper {

	public Book mapToBook(BookDto bookDto) {
		return new Book(
				bookDto.getBookId(),
				bookDto.getTitle(),
				bookDto.getAuthor(),
				bookDto.getDescription(),
				bookDto.getIsbn(),
				bookDto.getPrice(),
				bookDto.getPublishedDate(),
				bookDto.getLastUpdatedDate(),
				bookDto.getAvgRating(),
				bookDto.getCover(),
				bookDto.getAvailable(),
				bookDto.getCategory(),
				bookDto.getReview());
	}
	
	public BookDto mapToBookDto(Book book) {
		return new BookDto(
				book.getBookId(),
				book.getTitle(),
				book.getAuthor(),
				book.getDescription(),
				book.getIsbn(),
				book.getPrice(),
				book.getPublishedDate(),
				book.getLastUpdatedDate(),
				book.getAvgRating(),
				book.getCover(),
				book.getAvailable(),
				book.getCategory(),
				book.getReview());
		
	}
}
