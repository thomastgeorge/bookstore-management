package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Book;

@Repository
public class BookDao {
//	@Autowired
//	BookRepository bookRepository;
//	@Autowired
//	CategoryRepository categoryRepository;
//	@Autowired
//	BookOrder bookOrderRepository;

	public Book createBook(Book b, Long cid) {
		
		Category cat=crepository.findById(cid);
		b.setCategory(cat);
		return brepository.save(b);
	}

	public List<Book> listAllBooks() {
		return brepository.findAll();
	}

	public Book editBook(Long bookId, Book b, Long cid) {
		Category cat=crepository.findById(cid);
		b.setCategory(cat);
		return brepository.save(b);
	}

	public void deleteBook(Long bookId) {
		Book b=brepository.findBy(bookId);
		if(b!=null) {
			
		}
		brepository.customDelete(bookId);
		
	}

	public Book viewBook(Long bookId) {
		return brepository.findById(bookId).get();
	}

	public List<Book> listBooksByCategory(String category) {
		return brepository.findByCategory_categoryName(category);
	}

	public List<Book> listBestSellingBook() {
		
		return borepsoitory.listBestSellingBook();
	}
	
//	BOREP
//	 @Query("SELECT b FROM Book b JOIN BookOrder bo ON b.bookId = bo.book.bookId " +
//	           "GROUP BY b.bookId ORDER BY SUM(bo.quantity) DESC")
//	    List<Book> findBestSellingBooks();
	

}
