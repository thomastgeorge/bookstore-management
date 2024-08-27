package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
