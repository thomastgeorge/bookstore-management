package com.grayMatter.dto;

import java.sql.Date;
import java.util.List;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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

    @NotNull(message = "Title cannot be null")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters long")
    private String title;

    @NotNull(message = "Author cannot be null")
    @Size(min = 1, max = 255, message = "Author name must be between 1 and 255 characters long")
    private String author;

    @Size(max = 1000, message = "Description must be up to 1000 characters long")
    private String description;

    @Pattern(regexp = "^(97(8|9))?\\d{9}(\\d|X)$", message = "ISBN must be a valid ISBN-10 or ISBN-13")
    private String isbn;

    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be positive")
    private double price;

    @PastOrPresent(message = "Published date cannot be in the future")
    private Date publishedDate;

    @PastOrPresent(message = "Last updated date cannot be in the future")
    private Date lastUpdatedDate;

    @DecimalMin(value = "0.0", inclusive = true, message = "Average rating must be positive")
    @DecimalMax(value = "5.0", inclusive = true, message = "Average rating must be at most 5.0")
    private float avgRating;

    @NotNull(message = "Book cover cannot be null")
    private String cover;

    private Boolean available;
	private Category category;
	private List<Review> review;

}
