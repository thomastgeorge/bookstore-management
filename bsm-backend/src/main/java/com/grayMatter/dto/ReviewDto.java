package com.grayMatter.dto;

import java.sql.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
	
	@NotNull(message = "Headline cannot be null")
    @Size(min = 1, max = 100, message = "Headline must be between 1 and 100 characters long")
    private String headLine;

    @Size(max = 500, message = "Comment must be up to 500 characters long")
    private String comment;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    
    private int rating;
	private Date reviewedOn;
	private Book book;
	private Customer customer;

}

