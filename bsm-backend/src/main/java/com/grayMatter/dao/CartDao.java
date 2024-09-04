package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Cart;
import com.grayMatter.entities.Customer;
import com.grayMatter.repositories.BookRepository;
import com.grayMatter.repositories.CartRepository;
import com.grayMatter.repositories.CustomerRepository;

@Repository
public class CartDao {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	public Cart createCart(long customerId, long bookId, Cart cart) {
		Customer customer = customerRepository.findById(customerId).get();
		Book book = bookRepository.findById(bookId).get();
		cart.setCustomer(customer);
		cart.setBook(book);
		return cartRepository.save(cart);
	}
	
	public List<Cart> getByCustomerId(long customerId){
		return cartRepository.findByCustomerCustomerId(customerId);
	}
	
	public Cart updateCart(long cartId, int quantity) {
		Cart cart = cartRepository.findById(cartId).get();
		if(cart == null)
			return null;
		cart.setQuantity(quantity);
		return cartRepository.save(cart);
	}
	
	public void deleteCart(long cartId) {
		cartRepository.deleteById(cartId);	}

}
