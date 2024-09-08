package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Category;
import com.grayMatter.repositories.BookOrderRepository;
import com.grayMatter.repositories.BookRepository;
import com.grayMatter.repositories.CategoryRepository;

@Repository
public class BookDao {
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private BookOrderRepository bookOrderRepository;

	public Book createBook(Book book, long categoryId) {
		Category cat=categoryRepository.findById(categoryId).get();
		book.setCategory(cat);
		return bookRepository.save(book);
	}

	public List<Book> listAllBooks() {
		return bookRepository.findAll();
	}

	public Book editBook(long bookId, Book book, long categoryId) {
		Category cat=categoryRepository.findById(categoryId).get();
		book.setCategory(cat);
		book.setBookId(bookId);
		return bookRepository.save(book);
	}

	public void deleteBook(long bookId) {
		Book b=bookRepository.findById(bookId).get();
		if(b!=null) {

		}
		bookRepository.customDelete(bookId);
	}

	public Book getBookById(long bookId) {
		return bookRepository.findById(bookId).get();
	}

	public List<Book> listBooksByCategory(String category) {
		return bookRepository.findByCategoryCategoryName(category);
	}

	public List<Book> searchBook(String query, Long category, Double minPrice, Double maxPrice) {
		return bookRepository.searchBook(query, category, minPrice, maxPrice);
		
	}
	
	public List<Book> newArrivals(int limit) {
        return bookRepository.newArrivals(limit);
    }
	
	public List<Book> getTopRatedBooks(int limit){
		Pageable pageable =  PageRequest.of(0, limit);
		return bookRepository.findAllByOrderByAvgRatingDesc(pageable);
	}
	
	public long getTotalBooks() {
        return bookRepository.count();
    }

	public List<Book> BestSellingBooks(int limit) {
		Pageable pageable = PageRequest.of(0, limit); // Page 0, with 'limit' number of items
        return bookOrderRepository.findTopSellingBooks(pageable);
	}


}
