package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.grayMatter.configuration.UserPrincipal;
import com.grayMatter.dao.ReviewDao;
import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.ReviewDto;
import com.grayMatter.dto.ReviewMapper;
import com.grayMatter.entities.Review;

@Service
public class ReviewService implements ReviewServiceInterface {

	@Autowired
	ReviewDao reviewDao;
	@Autowired 
	ReviewMapper reviewMapper;
	
	@Override
	public List<ReviewDto> getReviewByBookId(long bookId) {
		List<Review> reviewList = reviewDao.getReviewByBookId(bookId);
		return reviewList.stream()
                .map(reviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
	}

	@Override
	public ReviewDto createReview(ReviewDto reviewDto, long bookId) {
		// TODO Auto-generated method stub
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserPrincipal userPrincipal = (UserPrincipal) userDetails;
        Long userId = userPrincipal.getUserId();
		return reviewMapper.mapToReviewDto(reviewDao.createReview(reviewMapper.mapToReview(reviewDto),bookId,userId));
	}

	@Override
	public List<ReviewDto> getReviewByCustomer() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserPrincipal userPrincipal = (UserPrincipal) userDetails;
        Long userId = userPrincipal.getUserId();
    	List<Review> reviewList = reviewDao.getReviewByCustomerId(userId);
		return reviewList.stream()
                .map(reviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
	}

	@Override
	public ReviewDto updateReview(ReviewDto reviewDto) {
		return reviewMapper.mapToReviewDto(reviewDao.updateReview(reviewMapper.mapToReview(reviewDto)));
	}

	@Override
	public void delete(long reviewId) {
		reviewDao.delete(reviewId);
	}

	@Override
	public List<ReviewDto> getReviewByCustomerAdmin(long customerId) {
		List<Review> reviewList = reviewDao.getReviewByCustomerIdAdmin(customerId);
		return reviewList.stream()
                .map(reviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
	}
	

}
