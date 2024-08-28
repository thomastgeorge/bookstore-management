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
import com.grayMatter.entities.Book;
import com.grayMatter.services.BookService;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
	
@Autowired
BookService service;
	
   @PostMapping("/create/{cid}")
	public BookDto createBook(@RequestBody BookDto b, @PathVariable Long cid) {
		return service.createBook(b,cid);
	}
   @GetMapping()
   public List<BookDto> listAllBooks(){
	   return service.listAllBooks();
	   
   }
   @PutMapping("/update/{bookId}/{cid}")
   public BookDto editBook(@PathVariable Long bookId,@RequestBody BookDto b,@PathVariable Long cid)
   {
	   return service.editBook(bookId,b,cid);
   }
   @PutMapping("/delete/{bookId}")
   public void deleteBook(@PathVariable Long bookId) {
	   service.deleteBook(bookId);
   }
   @GetMapping("/{bookId}")
   public BookDto viewBook(@PathVariable Long bookId) {
	   return service.viewBook(bookId);
   }
   @GetMapping("/category/{category}")
   public List<BookDto> listBooksByCategory(@PathVariable String category){
	   return service.listBooksByCategory(category);
	   
   }
   @GetMapping("/best")
   public List<BookDto> listBestSellingBook(){
	   return service.listBestSellingBook();
	   
   }
 
}
