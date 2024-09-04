package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Cart;

@Component
public class CartMapper {
	
	public CartDto mapToCartDto(Cart cart) {
		return new CartDto(
				cart.getCartId(),
				cart.getQuantity(),
				cart.getCustomer(),
				cart.getBook()
				);
	}
	
	public Cart maptToCart(CartDto cartDto) {
		return new Cart(
				cartDto.getCartId(),
				cartDto.getQuantity(),
				cartDto.getCustomer(),
				cartDto.getBook()
				);
	}

}
