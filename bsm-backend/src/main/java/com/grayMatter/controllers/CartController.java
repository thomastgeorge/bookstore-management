package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<CartDto> createCart(@PathVariable("bookId") long bookId, @RequestBody CartDto cartDto) {
        CartDto createdCart = cartServices.createCart(bookId, cartDto);
        return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<CartDto>> getByCustomer() {
        List<CartDto> carts = cartServices.getByCustomer();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @PutMapping("/{cartId}/{quantity}")
    public ResponseEntity<CartDto> updateCart(@PathVariable("cartId") long cartId, @PathVariable("quantity") int quantity) {
        CartDto updatedCart = cartServices.updateCart(cartId, quantity);
        if (updatedCart != null) {
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable("cartId") long cartId) {
        try {
        	cartServices.deleteCart(cartId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }

}
