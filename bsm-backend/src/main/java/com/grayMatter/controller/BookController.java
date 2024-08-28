package com.grayMatter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.BookDto;
import com.grayMatter.services.BookService;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("/create/{categoryId}")
	public BookDto createBook(@RequestBody BookDto bookDto, @PathVariable("categoryId") Long categoryId) {
		return bookService.createBook(bookDto, categoryId);
	}

	@GetMapping()
	public List<BookDto> listAllBooks() {
		return bookService.listAllBooks();

	}

	@PutMapping("/update/{bookId}/{categoryId}")
	public BookDto editBook(@PathVariable("bookId") Long bookId, @RequestBody BookDto b, @PathVariable("categoryId") Long categoryId) {
		return bookService.editBook(bookId, b, categoryId);
	}

	@PutMapping("/delete/{bookId}")
	public void deleteBook(@PathVariable("bookId") Long bookId) {
		bookService.deleteBook(bookId);
	}

	@GetMapping("/{bookId}")
	public BookDto viewBook(@PathVariable("bookId") Long bookId) {
		return bookService.viewBook(bookId);
	}

	@GetMapping("/category/{category}")
	public List<BookDto> listBooksByCategory(@PathVariable("category") String category) {
		return bookService.listBooksByCategory(category);

	}

	@GetMapping("/best-selling")
	public List<BookDto> listBestSellingBook() {
		return bookService.listBestSellingBook();

	}

}
