package com.grayMatter.entities;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long customerId;
	private String name;
	
	@Column(unique = true, nullable = false)
	private String mobile;
	private Date registeredOn;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="addressId",referencedColumnName = "addressId")
	private Address address;
	
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="userId", referencedColumnName = "userId")
	private User user;
	
	@OneToMany(mappedBy = "orderId", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Order> order;
	
	@OneToMany(mappedBy = "reviewId", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Review> review;
	
	@OneToMany(mappedBy = "cartId", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Cart> cart;

}
