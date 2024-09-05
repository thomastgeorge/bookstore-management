package com.grayMatter.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long reviewId;
	private String headLine;
	private String comment;
	private int rating;
	private Date reviewedOn;
	
	@ManyToOne
	@JoinColumn(name="bookId", referencedColumnName = "bookId")
	@JsonIgnore
	@JsonBackReference
	private Book book;
	
	@ManyToOne
	@JoinColumn(name="customerId", referencedColumnName = "customerId")
	@JsonBackReference
	private Customer customer;

}
