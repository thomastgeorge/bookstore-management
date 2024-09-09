package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.grayMatter.exceptions.BookIdNotFoundException;
import com.grayMatter.exceptions.CategoryNotFoundException;
import com.grayMatter.exceptions.InvalidRequestException;
import com.grayMatter.exceptions.NoContentFoundException;
import com.grayMatter.services.BookService;

@RestController
@RequestMapping("/api/v1/book")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("/create/{categoryId}")
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto, @PathVariable("categoryId") long categoryId) throws InvalidRequestException {
        BookDto createdBook = bookService.createBook(bookDto, categoryId);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> listAllBooks() throws NoContentFoundException {
        List<BookDto> books = bookService.listAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PutMapping("/update/{bookId}/{categoryId}")
    public ResponseEntity<BookDto> editBook(@PathVariable("bookId") long bookId,
    										@RequestBody BookDto bookDto,
    										@PathVariable("categoryId") long categoryId) throws BookIdNotFoundException {
        BookDto updatedBook = bookService.editBook(bookId, bookDto, categoryId);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable("bookId") long bookId) throws BookIdNotFoundException {
        try {
            bookService.deleteBook(bookId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("bookId") long bookId) throws BookIdNotFoundException {
        BookDto bookDto = bookService.getBookById(bookId);
        return new ResponseEntity<>(bookDto, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<BookDto>> listBooksByCategory(@PathVariable("category") String category) throws CategoryNotFoundException {
        List<BookDto> books = bookService.listBooksByCategory(category);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{userRole}/search")
    public ResponseEntity<List<BookDto>> searchBook(
    		@PathVariable String userRole,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) throws NoContentFoundException {
        List<BookDto> books = bookService.searchBook(query, category, minPrice, maxPrice, userRole);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/new-arrivals/{limit}")
    public ResponseEntity<List<BookDto>> newArrivals(@PathVariable int limit) {
        List<BookDto> books = bookService.newArrivals(limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/top-rated/{limit}")
    public ResponseEntity<List<BookDto>> getTopRatedBooks(@PathVariable int limit) throws InvalidRequestException {
        List<BookDto> books = bookService.getTopRatedBooks(limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalBooks() throws NoContentFoundException {
        long count = bookService.getTotalBooks();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    
    @GetMapping("/best-selling")
    public ResponseEntity<List<BookDto>> getTopSellingBooks(
    							@RequestParam(value = "limit", defaultValue = "8") int limit) throws InvalidRequestException {
        List<BookDto> topSellingBooks = bookService.getTopSellingBooks(limit);
        return ResponseEntity.ok(topSellingBooks);
    }

}
