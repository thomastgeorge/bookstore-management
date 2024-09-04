package com.grayMatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.ReviewDao;
import com.grayMatter.dto.ReviewDto;
import com.grayMatter.dto.ReviewMapper;
import com.grayMatter.entities.Review;


@Service
public class ReviewService {

	@Autowired
	ReviewDao reviewDao;
	@Autowired 
	ReviewMapper reviewMapper;
	
	public List<ReviewDto> getReviewByBookId(long bookId) {
		List<Review> reviewList = reviewDao.getReviewByBookId(bookId);
		return reviewList.stream()
                .map(reviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
		
	}
	

}
