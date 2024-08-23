package com.grayMatter.entities;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	private Boolean available;	//false for not-available, true for available
	
	@ManyToOne
	@JoinColumn(name="categoryId", referencedColumnName = "categoryId")
	private Category category;
	
	@OneToMany(mappedBy = "reviewId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Review> review;

}
