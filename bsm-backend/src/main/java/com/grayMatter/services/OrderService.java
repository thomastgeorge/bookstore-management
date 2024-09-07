package com.grayMatter.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.AddressDao;
import com.grayMatter.dao.BookDao;
import com.grayMatter.dao.CustomerDao;
import com.grayMatter.dao.OrderDao;
import com.grayMatter.dto.OrdersDto;
import com.grayMatter.dto.OrdersMapper;
import com.grayMatter.entities.Address;
import com.grayMatter.entities.Book;
import com.grayMatter.entities.BookOrder;
import com.grayMatter.entities.Customer;

@Service
public class OrderService {
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrdersMapper ordersMapper;
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private BookDao bookDao;
	
	public OrdersDto getOrderById(long orderId) {
		return ordersMapper.mapToOrdersDto(orderDao.getOrderById(orderId));
	}

	public OrdersDto addOrder(long customerId, Long addressId, OrdersDto ordersDto) {
	    // Fetch the customer and set it in ordersDto
	    Customer customer = customerDao.getCustomerById(customerId);
	    ordersDto.setCustomer(customer);
	    
	    Address address = addressDao.getById(addressId);
	    ordersDto.setAddress(address);
	    
	    ordersDto.setOrderDate(new Date(System.currentTimeMillis()));

	    // Update each BookOrder with the corresponding Book
	    List<BookOrder> bookOrders = ordersDto.getBookorder();
	    if (bookOrders != null) {
	        for (BookOrder bookOrder : bookOrders) {
	            Book book = bookDao.getBookById(bookOrder.getBook().getBookId());
	            bookOrder.setBook(book);
	        }
	    }

	    // Persist the order and map it to OrdersDto
	    return ordersMapper.mapToOrdersDto(orderDao.addOrder(ordersMapper.mapToOrders(ordersDto)));
	}


}
