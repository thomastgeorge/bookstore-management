package com.grayMatter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.entities.Book;
import com.grayMatter.repository.BookRepository;

import jakarta.transaction.Transactional;

@Service
public class BookService {
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
}
