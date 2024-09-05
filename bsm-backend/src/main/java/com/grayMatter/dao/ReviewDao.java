package com.grayMatter.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.dto.ReviewDto;
import com.grayMatter.entities.Review;
import com.grayMatter.entities.Book;
import com.grayMatter.entities.Customer;
import com.grayMatter.repositories.BookRepository;
import com.grayMatter.repositories.ReviewRepository;
import com.grayMatter.repositories.CustomerRepository;
import com.grayMatter.configuration.UserPrincipal;

@Repository
public class ReviewDao {
	
	@Autowired
	ReviewRepository reviewRepository;
	@Autowired
	BookRepository bookRepository;
	@Autowired
	CustomerRepository customerRepository;

	public List<Review> getReviewByBookId(long bookId) {
		
		return reviewRepository.findByBookBookId(bookId);
	}


	public Review createReview(Review review, long bookId, Long userId) {
		UserPrincipal user;
		Customer customer=customerRepository.findByUserUserId(userId);
		Book book=bookRepository.findById(bookId).get();
		
		LocalDate localDate = LocalDate.now();
		review.setReviewedOn(Date.valueOf(localDate));
		review.setBook(book);
        review.setCustomer(customer);
        return reviewRepository.save(review);
        }


	public List<Review> getReviewByCustomerId(Long userId) {
		// TODO Auto-generated method stub
		Customer customer=customerRepository.findByUserUserId(userId);
		long customerId=customer.getCustomerId();
		return reviewRepository.findByCustomerCustomerId(customerId);
	}

}
