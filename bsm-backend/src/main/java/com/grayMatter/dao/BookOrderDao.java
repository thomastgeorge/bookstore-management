package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.BookOrder;
import com.grayMatter.repositories.BookOrderRepository;

@Repository
public class BookOrderDao {
	
	@Autowired
	private BookOrderRepository bookOrderRepository;

	public void createBookOrder(BookOrder bookOrder) {
		bookOrderRepository.save(bookOrder);
	}

	public List<BookOrder> getAllBookOrder() {
		return bookOrderRepository.findAll();
	}

	public BookOrder getBookOrderById(long bookOrderId) {
		return bookOrderRepository.findById(bookOrderId).get();
	}

}
