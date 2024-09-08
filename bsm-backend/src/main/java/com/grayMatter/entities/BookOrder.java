package com.grayMatter.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookOrderId;
	private int quantity;
	private int subTotal;
	
	@ManyToOne
	@JoinColumn(name="bookId", referencedColumnName = "bookId")
	private Book book;
	
	@ManyToOne
	@JoinColumn(name="orderId", referencedColumnName = "orderId")
	@JsonBackReference
	private Orders orders;

}
