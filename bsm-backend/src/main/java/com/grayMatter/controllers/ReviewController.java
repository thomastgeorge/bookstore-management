package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.ReviewDto;
import com.grayMatter.services.ReviewService;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
	@Autowired
	ReviewService reviewService;
	
	@GetMapping("/book/{bookId}")
	public List<ReviewDto> getReviewBookById(@PathVariable("bookId") long bookId) {
		return reviewService.getReviewByBookId(bookId);
	}

}
