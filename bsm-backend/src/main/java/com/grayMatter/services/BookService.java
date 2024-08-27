package com.grayMatter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.BookDao;
import com.grayMatter.entities.Book;
import com.grayMatter.repository.BookRepository;

import jakarta.transaction.Transactional;

@Service
public class BookService {
	@Autowired 
	BookDao bdao;

	public Book createBook(Book b) {
		// TODO Auto-generated method stub
		return null;
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

	public List<Book> listAllBooks() {
		// TODO Auto-generated method stub
		return null;
	}

	public Book editBook(Long bookId, Book b) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteBook(Long bookId) {
		// TODO Auto-generated method stub
//		return null;
	}

	public Book viewBook(Long bookId) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Book> listBooksByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Book> listBestSellingBook() {
		// TODO Auto-generated method stub
		return null;
	}
}
