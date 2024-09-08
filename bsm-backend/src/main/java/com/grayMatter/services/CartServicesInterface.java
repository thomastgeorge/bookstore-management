package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.CartDto;

public interface CartServicesInterface {

	CartDto createCart(long bookId, CartDto cartDto);

    List<CartDto> getByCustomer();

    CartDto updateCart(long cartId, int quantity);

    void deleteCart(long cartId);
	    
}
