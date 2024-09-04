package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.CartDao;
import com.grayMatter.dto.CartDto;
import com.grayMatter.dto.CartMapper;
import com.grayMatter.entities.Cart;

@Service
public class CartServices {
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private CartMapper cartMapper;
	
	public CartDto createCart(long customerId, long bookId, CartDto cartDto) {
		return cartMapper.mapToCartDto(cartDao.createCart(customerId, bookId, cartMapper.maptToCart(cartDto)));
	}
	
	public List<CartDto> getByCustomerId(long customerId){
		List<Cart> cartList = cartDao.getByCustomerId(customerId);
		return cartList.stream()
				 .map(cartMapper::mapToCartDto)
	             .collect(Collectors.toList());
	}
	
	public CartDto updateCart(long cartId, int quantity) {
		return cartMapper.mapToCartDto(cartDao.updateCart(cartId, quantity));
	}
	
	public void deleteCart(long cartId) {
		cartDao.deleteCart(cartId);
	}

}
