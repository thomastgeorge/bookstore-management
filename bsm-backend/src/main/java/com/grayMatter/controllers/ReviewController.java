package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.ReviewDto;
import com.grayMatter.services.ReviewService;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
	@Autowired
	ReviewService reviewService;
	
	@PostMapping("/create/{bookId}")
	public ReviewDto createBook(@RequestBody ReviewDto reviewDto ,@PathVariable("bookId") long bookId) {
		return reviewService.createReview(reviewDto,bookId);
	}
	@GetMapping("/book/{bookId}")
	public List<ReviewDto> getReviewByBookId(@PathVariable("bookId") long bookId) {
		return reviewService.getReviewByBookId(bookId);
	}
	@GetMapping("/customer")
	public List<ReviewDto> getReviewByCustomer() {
		return reviewService.getReviewByCustomer();
	}

}
