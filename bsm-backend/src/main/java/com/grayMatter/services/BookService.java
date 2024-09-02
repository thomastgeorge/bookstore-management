package com.grayMatter.services;

import java.util.ArrayList;
import java.util.List;

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

	public BookDto createBook(BookDto bookDto, Long categoryId) {
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

	public BookDto editBook(Long bookId, BookDto bookDto, Long cid) {
		Book book = bookDao.editBook(bookId, bookMapper.mapToBook(bookDto), cid);
		return bookMapper.mapToBookDto(book);
	}

	public void deleteBook(Long bookId) {
		bookDao.deleteBook(bookId);
	}

	public BookDto viewBook(Long bookId) {
		return bookMapper.mapToBookDto(bookDao.viewBook(bookId));
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

	public List<BookDto> listBestSellingBook() {
		List<Book> bList = bookDao.listBestSellingBook();
		List<BookDto> bDList = new ArrayList<>();
		for (Book b : bList) {
			BookDto bookDto = bookMapper.mapToBookDto(b);
			bDList.add(bookDto);
		}
		return bDList;

	}
}
