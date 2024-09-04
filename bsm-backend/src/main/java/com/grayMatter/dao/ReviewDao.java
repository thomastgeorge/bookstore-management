package com.grayMatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.grayMatter.entities.Review;
import com.grayMatter.repositories.BookRepository;
import com.grayMatter.repositories.ReviewRepository;

@Repository
public class ReviewDao {
	
	@Autowired
	ReviewRepository reviewRepository;
	

	public List<Review> getReviewByBookId(long bookId) {
		
		return reviewRepository.findByBookBookId(bookId);
	}

}
