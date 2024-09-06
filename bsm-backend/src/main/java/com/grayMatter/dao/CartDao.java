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
	
	public Cart createCart(long userId, long bookId, Cart cart) {
		
		Customer customer=customerRepository.findByUserUserId(userId);
		if(cartRepository.existsByCustomerCustomerIdAndBookBookId(customer.getCustomerId(), bookId))
			return null;
		Book book = bookRepository.findById(bookId).get();
		cart.setCustomer(customer);
		cart.setBook(book);
		return cartRepository.save(cart);
	}
	
	public List<Cart> getByCustomerId(long userId){
		
		Customer customer=customerRepository.findByUserUserId(userId);
		long customerId=customer.getCustomerId();
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
