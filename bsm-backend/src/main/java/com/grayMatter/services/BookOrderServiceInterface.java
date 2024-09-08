package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.BookOrderDto;

public interface BookOrderServiceInterface {

	void createBookOrder(List<BookOrderDto> list);

    List<BookOrderDto> getAllBookOrder();

    BookOrderDto getBookOrderById(long bookOrderId);
    
}
