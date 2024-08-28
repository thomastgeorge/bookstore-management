package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import com.grayMatter.entities.Category;
import com.grayMatter.entities.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
	
	private Long bookId;
	private String title;
	private String author;
	private String description;
	private String isbn;
	private double price;
	private Date publishedDate;
	private Date lastUpdatedDate;
	private float avgRating;
	private String cover;
	private Boolean available;
	private Category category;
	private List<Review> review;

}
