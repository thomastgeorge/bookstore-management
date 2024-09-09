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
		
		Customer customer=customerRepository.findByUserUserId(userId);
		Book book=bookRepository.findById(bookId).get();
		LocalDate localDate = LocalDate.now();
		review.setReviewedOn(Date.valueOf(localDate));
		review.setBook(book);
        review.setCustomer(customer);
        Review savedReview = reviewRepository.save(review);
        updateBookRating(bookId);
        return savedReview;
        }


	public List<Review> getReviewByCustomerId(Long userId) {
		
		Customer customer=customerRepository.findByUserUserId(userId);
		long customerId=customer.getCustomerId();
		return reviewRepository.findByCustomerCustomerId(customerId);
	}


	public Review updateReview(Review review) {
		Review updatedReview = reviewRepository.save(review);
		updateBookRating(updatedReview.getBook().getBookId()); 
		return updatedReview;
	}


	public void delete(long reviewId) {
		Review review = reviewRepository.findById(reviewId).orElse(null);
		if (review != null) {
			long bookId = review.getBook().getBookId();
			reviewRepository.deleteById(reviewId);
			updateBookRating(bookId); 
		}
	}


	public List<Review> getReviewByCustomerIdAdmin(long customerId) {
		return reviewRepository.findByCustomerCustomerId(customerId);
	}
	
	private void updateBookRating(long bookId) {
		List<Review> reviews = reviewRepository.findByBookBookId(bookId);
		if (reviews.isEmpty()) {
			return; 
		}

		float totalRating = 0;
		for (Review review : reviews) {
			totalRating += review.getRating();
			
		}
		System.out.println(totalRating);
		System.out.println(reviews.size());
		float averageRating = totalRating / reviews.size();

		Book book = bookRepository.findById(bookId).orElse(null);
		if (book != null) {
			book.setAvgRating(averageRating);
			bookRepository.save(book);
		}
	}
}
