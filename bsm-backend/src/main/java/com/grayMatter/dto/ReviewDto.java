package com.grayMatter.dto;

import java.sql.Date;

import com.grayMatter.entities.Book;
import com.grayMatter.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewDto {

	private Long reviewId;
	private String headLine;
	private String comment;
	private int rating;
	private Date reviewedOn;
	private Book book;
	private Customer customer;

}

