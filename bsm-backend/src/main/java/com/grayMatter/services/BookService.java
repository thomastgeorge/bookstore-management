package com.grayMatter.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.BookDao;
import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.BookMapper;
import com.grayMatter.entities.Book;


@Service
public class BookService {

	@Autowired
	private BookDao bookDao;

	@Autowired
	private BookMapper bookMapper;

	public BookDto createBook(BookDto bookDto, long categoryId) {
		return bookMapper.mapToBookDto(bookDao.createBook(bookMapper.mapToBook(bookDto), categoryId));
	}

	public List<BookDto> listAllBooks() {
		List<Book> bList = bookDao.listAllBooks();
		List<BookDto> bDList = new ArrayList<>();
		for (Book b : bList) {
			BookDto bookDto = bookMapper.mapToBookDto(b);
			bDList.add(bookDto);
		}
		return bDList;
	}

	public BookDto editBook(long bookId, BookDto bookDto, long cid) {
		Book book = bookDao.editBook(bookId, bookMapper.mapToBook(bookDto), cid);
		return bookMapper.mapToBookDto(book);
	}

	public void deleteBook(long bookId) {
		bookDao.deleteBook(bookId);
	}

	public BookDto getBookById(long bookId) {
		return bookMapper.mapToBookDto(bookDao.getBookById(bookId));
	}

	public List<BookDto> listBooksByCategory(String category) {
		List<Book> bList = bookDao.listBooksByCategory(category);
		List<BookDto> bDList = new ArrayList<>();
		for (Book b : bList) {
			BookDto bookDto = bookMapper.mapToBookDto(b);
			bDList.add(bookDto);
		}
		return bDList;

	}

	public List<BookDto> listBestSellingBook(Integer limit) {
		List<Book> bookList = bookDao.listBestSellingBook(limit);
		return bookList.stream()
                .map(bookMapper::mapToBookDto)
                .collect(Collectors.toList());
	}

	public List<BookDto> searchBook(String title, Long category, Double minPrice, Double maxPrice) {
		List<Book> bookList = bookDao.searchBook(title, category, minPrice, maxPrice);
		return bookList.stream()
                .map(bookMapper::mapToBookDto)
                .collect(Collectors.toList());
	}
	
	public List<BookDto> newArrivals(int limit) {
		List<Book> bookList = bookDao.newArrivals(limit);
		return bookList.stream()
		        .map(bookMapper::mapToBookDto)
		        .collect(Collectors.toList());
    }
	
}
