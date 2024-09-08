package com.grayMatter.services;

import java.util.List;

import com.grayMatter.dto.ReviewDto;

public interface ReviewServiceInterface {
	
	List<ReviewDto> getReviewByBookId(long bookId);
    
    ReviewDto createReview(ReviewDto reviewDto, long bookId);
    
    List<ReviewDto> getReviewByCustomer();
    
    ReviewDto updateReview(ReviewDto reviewDto);
    
    void delete(long reviewId);
    
    List<ReviewDto> getReviewByCustomerAdmin(long customerId);

}
