package com.grayMatter.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.BookDao;
import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.BookMapper;
import com.grayMatter.entities.Book;
import com.grayMatter.repository.BookRepository;

import jakarta.transaction.Transactional;

@Service
public class BookService {
	@Autowired 
	BookDao bdao;

	@Autowired
	BookMapper mapper;
	
	public BookDto createBook(BookDto bdto, Long cid) {
		return mapper.mapToBookDto(bdao.createBook(mapper.mapToBook(bdto),cid));
		
	}
//    @Autowired
//    private EntityManager entityManager;
//
//    @Transactional
//    public List<Book> getAllBooks() {
//        Session session = entityManager.unwrap(Session.class);
//        session.enableFilter("deletedFilter");
//        return entityManager.createQuery("FROM Book", Book.class).getResultList();
//    }
//
//    @Transactional
//    public void deleteBook(Long id) {
//        Book book = entityManager.find(Book.class, id);
//        if (book != null) {
//            book.setIsDeleted(true);
//            entityManager.merge(book);
//        }
//    }
//
//    // other methods

	public List<BookDto> listAllBooks() {
		 List<Book> bList = bdao.listAllBooks();
	        List<BookDto> bDList = new ArrayList<>();
	        for (Book b : bList) {
	            BookDto bDto = mapper.mapToBookDto(b);
	            bDList.add(bDto);
	        }
	        return bDList;
	}

	public BookDto editBook(Long bookId, BookDto bdto, Long cid) {
		Book b=bdao.editBook(bookId,mapper.mapToBook(bdto),cid);
		return mapper.mapToBookDto(b);
	}

	public void deleteBook(Long bookId) {
     bdao.deleteBook(bookId);
	}

	public BookDto viewBook(Long bookId) {
		return mapper.mapToBookDto( bdao.viewBook(bookId)) ;
	}

	public List<BookDto> listBooksByCategory(String category) {
		 List<Book> bList = bdao.listBooksByCategory(category);
	        List<BookDto> bDList = new ArrayList<>();
	        for (Book b : bList) {
	            BookDto bDto = mapper.mapToBookDto(b);
	            bDList.add(bDto);
	        }
	        return bDList;
		
	}

	public List<BookDto> listBestSellingBook() {
		List<Book> bList = bdao.listBestSellingBook();
        List<BookDto> bDList = new ArrayList<>();
        for (Book b : bList) {
            BookDto bDto = mapper.mapToBookDto(b);
            bDList.add(bDto);
        }
        return bDList;
		
	}
}
