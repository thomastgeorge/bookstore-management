package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	public Book createBook(Book book, Long categoryId) {
		
		Category cat=categoryRepository.findById(categoryId).get();
		book.setCategory(cat);
		return bookRepository.save(book);
	}

	public List<Book> listAllBooks() {
		return bookRepository.findAll();
	}

	public Book editBook(Long bookId, Book book, Long categoryId) {
		Category cat=categoryRepository.findById(categoryId).get();
		book.setCategory(cat);
		return bookRepository.save(book);
	}

	public void deleteBook(Long bookId) {
		Book b=bookRepository.findById(bookId).get();
		if(b!=null) {

		}
		bookRepository.customDelete(bookId);
		
	}

	public Book viewBook(Long bookId) {
		return bookRepository.findById(bookId).get();
	}

	public List<Book> listBooksByCategory(String category) {
		return bookRepository.findByCategoryCategoryName(category);
	}

	public List<Book> listBestSellingBook() {
		
		return bookOrderRepository.findBestSellingBooks();
	}
	

	

}
