package com.grayMatter.dto;

import org.springframework.stereotype.Component;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Review;

@Component
public class ReviewMapper {
	public Review mapToReview(ReviewDto reviewDto) {
		return new Review(
				reviewDto.getReviewId(),
				reviewDto.getHeadLine(),
				reviewDto.getComment(),
				reviewDto.getRating(),
				reviewDto.getReviewedOn(),
				reviewDto.getBook(),
				reviewDto.getCustomer());		
	}
	
	public ReviewDto mapToReviewDto(Review review) {
		return new ReviewDto(
				review.getReviewId(),
				review.getHeadLine(),
				review.getComment(),
				review.getRating(),
				review.getReviewedOn(),
				review.getBook(),
				review.getCustomer());
		
	}

}
