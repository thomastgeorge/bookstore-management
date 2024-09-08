package com.grayMatter.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@ToString
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long orderId;
	private Date orderDate;
	private double totalTotal;
	private String paymentMethod;
	
	@ManyToOne
	@JoinColumn(name="addressId", referencedColumnName = "addressId")
	private Address address;
	
	@ManyToOne
	@JoinColumn(name="customerId", referencedColumnName = "customerId")
	private Customer customer;
	
	@OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BookOrder> bookorder;
	
	public Orders() {}
	
	public void addBookOrder(BookOrder bookOrder) {
		bookorder.add(bookOrder);
		bookOrder.setOrders(this);
	}

}
