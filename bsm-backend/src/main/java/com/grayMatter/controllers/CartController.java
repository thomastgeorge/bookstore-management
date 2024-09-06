package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.CartDto;
import com.grayMatter.services.CartServices;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
	
	@Autowired
	private CartServices cartServices;
	
	@PostMapping("/create/{bookId}")
	public CartDto createCart(@PathVariable("bookId") long bookId, @RequestBody CartDto cartDto) {
		return cartServices.createCart(bookId, cartDto);
	}
	
	@GetMapping("/customer")
	public List<CartDto> getByCustomer(){
		return cartServices.getByCustomer();
	}
	
	@PutMapping("/{cartId}/{quantity}")
	public CartDto updateCart(@PathVariable("cartId") long cartId, @PathVariable("quantity") int quantity) {
		return cartServices.updateCart(cartId, quantity);
	}
	
	@DeleteMapping("/{cartId}")
	public void deleteCart(@PathVariable("cartId") long cartId) {
		cartServices.deleteCart(cartId);
		
	}

}
