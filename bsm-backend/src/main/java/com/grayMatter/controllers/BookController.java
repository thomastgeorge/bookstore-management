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
import com.grayMatter.services.BookService;

@RestController
@RequestMapping("/api/v1/book")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("/create/{categoryId}")
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto, @PathVariable("categoryId") long categoryId) {
        BookDto createdBook = bookService.createBook(bookDto, categoryId);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> listAllBooks() {
        List<BookDto> books = bookService.listAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PutMapping("/update/{bookId}/{categoryId}")
    public ResponseEntity<BookDto> editBook(@PathVariable("bookId") long bookId, @RequestBody BookDto bookDto, @PathVariable("categoryId") long categoryId) {
        BookDto updatedBook = bookService.editBook(bookId, bookDto, categoryId);
        if (updatedBook != null) {
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable("bookId") long bookId) {
        try {
            bookService.deleteBook(bookId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("bookId") long bookId) {
        BookDto bookDto = bookService.getBookById(bookId);
        if (bookDto != null) {
            return new ResponseEntity<>(bookDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<BookDto>> listBooksByCategory(@PathVariable("category") String category) {
        List<BookDto> books = bookService.listBooksByCategory(category);
        if (books != null && !books.isEmpty()) {
            return new ResponseEntity<>(books, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDto>> searchBook(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<BookDto> books = bookService.searchBook(query, category, minPrice, maxPrice);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/new-arrivals/{limit}")
    public ResponseEntity<List<BookDto>> newArrivals(@PathVariable int limit) {
        List<BookDto> books = bookService.newArrivals(limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/top-rated/{limit}")
    public ResponseEntity<List<BookDto>> getTopRatedBooks(@PathVariable int limit) {
        List<BookDto> books = bookService.getTopRatedBooks(limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalBooks() {
        long count = bookService.getTotalBooks();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

}
