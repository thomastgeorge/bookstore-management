package com.grayMatter.entities;

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
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long cartId;
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name="customerId", referencedColumnName = "customerId")
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name="bookId", referencedColumnName = "bookId")
	private Book book;

}
