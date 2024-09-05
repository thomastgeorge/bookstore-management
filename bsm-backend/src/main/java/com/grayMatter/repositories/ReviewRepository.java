package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByBookBookId(Long bookId);

	List<Review> findByCustomerCustomerId(Long customerId);

}
