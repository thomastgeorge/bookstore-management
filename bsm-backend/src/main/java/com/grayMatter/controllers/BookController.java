package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.BookDto;
import com.grayMatter.services.BookService;

@RestController
@RequestMapping("/api/v1/book")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("/create/{categoryId}")
	public BookDto createBook(@RequestBody BookDto bookDto, @PathVariable("categoryId") long categoryId) {
		return bookService.createBook(bookDto, categoryId);
	}

	@GetMapping()
	public List<BookDto> listAllBooks() {
		return bookService.listAllBooks();
	}

	@PutMapping("/update/{bookId}/{categoryId}")
	public BookDto editBook(@PathVariable("bookId") long bookId, @RequestBody BookDto b, @PathVariable("categoryId") long categoryId) {
		return bookService.editBook(bookId, b, categoryId);
	}

	@DeleteMapping("/delete/{bookId}")
	public void deleteBook(@PathVariable("bookId") long bookId) {
		bookService.deleteBook(bookId);
	}

	@GetMapping("/{bookId}")
	public BookDto getBookById(@PathVariable("bookId") long bookId) {
		return bookService.getBookById(bookId);
	}

	@GetMapping("/category/{category}")
	public List<BookDto> listBooksByCategory(@PathVariable("category") String category) {
		return bookService.listBooksByCategory(category);
	}

	@GetMapping("/best-selling")
	public List<BookDto> listBestSellingBook(@RequestParam(required = false) Integer limit) {
		return bookService.listBestSellingBook(limit);

	}
	
	@GetMapping("/search")
	public List<BookDto> searchBook(
		    @RequestParam(required = false) String query,
		    @RequestParam(required = false) Long category,
		    @RequestParam(required = false) Double minPrice,
		    @RequestParam(required = false) Double maxPrice
		    ){
		return bookService.searchBook(query, category, minPrice, maxPrice);
	}
	
	@GetMapping("/new-arrivals/{limit}")
	public List<BookDto> newArrivals(@PathVariable int limit) {
		return bookService.newArrivals(limit);
	}
	
	@GetMapping("/top-rated/{limit}")
    public ResponseEntity<List<BookDto>> getTopRatedBooks(@PathVariable int limit) {
        List<BookDto> books = bookService.getTopRatedBooks(limit);
        return ResponseEntity.ok(books);
    }
	
	@GetMapping("/count")
	public long getTotalBooks() {
        return bookService.getTotalBooks();
    }

}
