package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.BookDao;
import com.grayMatter.dao.BookOrderDao;
import com.grayMatter.dto.BookOrderDto;
import com.grayMatter.dto.BookOrderMapper;
import com.grayMatter.entities.Book;
import com.grayMatter.entities.BookOrder;

@Service
public class BookOrderService implements BookOrderServiceInterface {
	
	@Autowired
	private BookOrderDao bookOrderDao;
	
	@Autowired
	private BookOrderMapper bookOrderMapper;
	
	@Autowired
	private BookDao bookDao;

	@Override
	public void createBookOrder(List<BookOrderDto> list) {
		for(BookOrderDto bookOrderDto : list){
			Book book = bookDao.getBookById(bookOrderDto.getBook().getBookId());
			bookOrderDto.setBook(book);
			bookOrderDao.createBookOrder(bookOrderMapper.mapToOrder(bookOrderDto));
		}
	}

	@Override
	public List<BookOrderDto> getAllBookOrder() {
		List<BookOrder> listBookOrder = bookOrderDao.getAllBookOrder();
		return listBookOrder.stream()
				 .map(bookOrderMapper::mapToBookOrderDto)
	             .collect(Collectors.toList());
	}

	@Override
	public BookOrderDto getBookOrderById(long bookOrderId) {
		return bookOrderMapper.mapToBookOrderDto(bookOrderDao.getBookOrderById(bookOrderId));
	}


}
