package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.grayMatter.configuration.UserPrincipal;
import com.grayMatter.dao.CartDao;
import com.grayMatter.dto.CartDto;
import com.grayMatter.dto.CartMapper;
import com.grayMatter.entities.Cart;

@Service
public class CartServices implements CartServicesInterface {
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private CartMapper cartMapper;
	
	@Override
	public CartDto createCart(long bookId, CartDto cartDto) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserPrincipal userPrincipal = (UserPrincipal) userDetails;
        Long userId = userPrincipal.getUserId();
		return cartMapper.mapToCartDto(cartDao.createCart(userId, bookId, cartMapper.maptToCart(cartDto)));
	}
	
	@Override
	public List<CartDto> getByCustomer(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserPrincipal userPrincipal = (UserPrincipal) userDetails;
    Long userId = userPrincipal.getUserId();
		List<Cart> cartList = cartDao.getByCustomerId(userId);
		return cartList.stream()
				 .map(cartMapper::mapToCartDto)
	             .collect(Collectors.toList());
	}
	
	@Override
	public CartDto updateCart(long cartId, int quantity) {
		return cartMapper.mapToCartDto(cartDao.updateCart(cartId, quantity));
	}
	
	@Override
	public void deleteCart(long cartId) {
		cartDao.deleteCart(cartId);
	}

}
