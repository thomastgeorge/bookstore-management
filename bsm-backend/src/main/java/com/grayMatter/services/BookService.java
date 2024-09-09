package com.grayMatter.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.BookDao;
import com.grayMatter.dao.UserDao;
import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.BookMapper;
import com.grayMatter.entities.Book;
import com.grayMatter.entities.User;

@Service
public class BookService implements BookServiceInterface {

	@Autowired
	private BookDao bookDao;

	@Autowired
	private BookMapper bookMapper;
	
	@Autowired
	private UserDao userDao;

	@Override
	public BookDto createBook(BookDto bookDto, long categoryId) {
		return bookMapper.mapToBookDto(bookDao.createBook(bookMapper.mapToBook(bookDto), categoryId));
	}

	@Override
	public List<BookDto> listAllBooks() {
		List<Book> bList = bookDao.listAllBooks();
		List<BookDto> bDList = new ArrayList<>();
		for (Book book : bList) {
			BookDto bookDto = bookMapper.mapToBookDto(book);
			bDList.add(bookDto);
		}
		return bDList;
	}

	@Override
	public BookDto editBook(long bookId, BookDto bookDto, long cid) {
		Book book = bookDao.editBook(bookId, bookMapper.mapToBook(bookDto), cid);
		return bookMapper.mapToBookDto(book);
	}

	@Override
	public void deleteBook(long bookId) {
		bookDao.deleteBook(bookId);
	}

	@Override
	public BookDto getBookById(long bookId) {
		return bookMapper.mapToBookDto(bookDao.getBookById(bookId));
	}

	@Override
	public List<BookDto> listBooksByCategory(String category) {
		List<Book> bList = bookDao.listBooksByCategory(category);
		List<BookDto> bDList = new ArrayList<>();
		for (Book b : bList) {
			BookDto bookDto = bookMapper.mapToBookDto(b);
			bDList.add(bookDto);
		}
		return bDList;

	}

	@Override
	public List<BookDto> searchBook(String query, Long category, Double minPrice, Double maxPrice, String userRole) {
		List<Book> bookList = bookDao.searchBook(query, category, minPrice, maxPrice);
		if(userRole.equals("ADMIN")) {
			return bookList.stream()
                .map(bookMapper::mapToBookDto)
                .collect(Collectors.toList());
		} else {
			return bookList.stream()
					.filter(Book::getAvailable)
	                .map(bookMapper::mapToBookDto)
	                .collect(Collectors.toList());
			
		}
	}
	
	@Override
	public List<BookDto> newArrivals(int limit) {
		List<Book> bookList = bookDao.newArrivals(limit);
		return bookList.stream()
				.filter(Book::getAvailable)
		        .map(bookMapper::mapToBookDto)
		        .collect(Collectors.toList());
    }
	
	@Override
	public List<BookDto> getTopRatedBooks(int limit){
		List<Book> bookList = bookDao.getTopRatedBooks(limit);
		return bookList.stream()
				.filter(Book::getAvailable)
		        .map(bookMapper::mapToBookDto)
		        .collect(Collectors.toList());
	}
	
	@Override
	public long getTotalBooks() {
        return bookDao.getTotalBooks();
    }

	@Override
	public List<BookDto> getTopSellingBooks(int limit) {
		List<Book> bookList = bookDao.BestSellingBooks(limit);
		return bookList.stream()
				.filter(Book::getAvailable)
		        .map(bookMapper::mapToBookDto)
		        .collect(Collectors.toList());
	}
	
}
