package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Book;

@Component
public class BookMapper {

	public Book mapToBook(BookDto bdto) {
		return new Book(bdto.getBookId(),bdto.getTitle(),bdto.getAuthor(),bdto.getDescription(),
				bdto.getIsbn(),bdto.getPrice(),bdto.getPublishedDate(),bdto.getLastUpdatedDate(),
				bdto.getAvgRating(),bdto.getCover(),bdto.getAvailable(),bdto.getCategory()
				,bdto.getReview());
	}
	
	public BookDto mapToBookDto(Book b) {
		return new BookDto(b.getBookId(),b.getTitle(),b.getAuthor(),b.getDescription(),
				b.getIsbn(),b.getPrice(),b.getPublishedDate(),b.getLastUpdatedDate(),
				b.getAvgRating(),b.getCover(),b.getAvailable(),b.getCategory()
				,b.getReview());
		
	}
}
