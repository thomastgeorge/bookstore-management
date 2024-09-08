package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.BookDto;
import com.grayMatter.dto.ReviewDto;
import com.grayMatter.exceptions.BookIdNotFoundException;
import com.grayMatter.exceptions.CustomerIdNotFoundException;
import com.grayMatter.exceptions.ReviewIdNotFoundException;
import com.grayMatter.services.ReviewService;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
	@Autowired
	ReviewService reviewService;
	
	@PostMapping("/create/{bookId}")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto, @PathVariable("bookId") long bookId) throws BookIdNotFoundException {
        ReviewDto createdReview = reviewService.createReview(reviewDto, bookId);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<ReviewDto>> getReviewByBookId(@PathVariable("bookId") long bookId) throws BookIdNotFoundException {
        List<ReviewDto> reviews = reviewService.getReviewByBookId(bookId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<ReviewDto>> getReviewByCustomer() {
        List<ReviewDto> reviews = reviewService.getReviewByCustomer();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/customer/admin/{customerId}")
    public ResponseEntity<List<ReviewDto>> getReviewByCustomerAdmin(@PathVariable("customerId") long customerId) throws CustomerIdNotFoundException {
        List<ReviewDto> reviews = reviewService.getReviewByCustomerAdmin(customerId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ReviewDto> updateReview(@RequestBody ReviewDto reviewDto) throws ReviewIdNotFoundException {
        ReviewDto updatedReview = reviewService.updateReview(reviewDto);
        return new ResponseEntity<>(updatedReview, HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable long reviewId) throws ReviewIdNotFoundException {
        try {
            reviewService.delete(reviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }

}
