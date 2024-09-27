package com.grayMatter.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grayMatter.dao.AddressDao;
import com.grayMatter.dao.BookDao;
import com.grayMatter.dao.BookOrderDao;
import com.grayMatter.dao.CustomerDao;
import com.grayMatter.dao.OrderDao;
import com.grayMatter.dto.OrdersDto;
import com.grayMatter.dto.OrdersMapper;
import com.grayMatter.entities.Address;
import com.grayMatter.entities.Book;
import com.grayMatter.entities.BookOrder;
import com.grayMatter.entities.Customer;
import com.grayMatter.entities.Orders;

import jakarta.transaction.Transactional;

@Service
public class OrderService implements OrderServiceInterface {
	
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
	
	@Autowired
	private BookOrderDao bookOrderDao;
	
	public OrdersDto getOrderById(long orderId) {
		return ordersMapper.mapToOrdersDto(orderDao.getOrderById(orderId));
	}

	@Transactional
	@Override
	public OrdersDto addOrder(long customerId, Long addressId, OrdersDto ordersDto) {
		Orders order = new Orders();
		
	    Customer customer = customerDao.getCustomerById(customerId);
	    order.setCustomer(customer);
	    
	    Address address = addressDao.getById(addressId);
	    order.setAddress(address);
	    
	    order.setOrderDate(new Date(System.currentTimeMillis()));
	    System.out.println(ordersDto);
	    
	    order.setTotalTotal(ordersDto.getTotalTotal());
	    order.setPaymentMethod(ordersDto.getPaymentMethod());
	    order.setBookorder(null);
	    
	    List<BookOrder> bol = new ArrayList<>();
	    List<BookOrder> bookOrders = ordersDto.getBookorder();
	    if (bookOrders != null) {
	        for (BookOrder bookOrder : bookOrders) {
	        	BookOrder bo = new BookOrder();
	            Book book = bookDao.getBookById(bookOrder.getBook().getBookId());
	            bo.setBook(book);
	            bo.setQuantity(bookOrder.getQuantity());
	            bo.setSubTotal(bookOrder.getSubTotal());
	            bo.setOrders(order);
	           // order.addBookOrder(bo);
	            bol.add(bo);
	        }
	    }
	    order.setBookorder(bol);
	    
	    orderDao.addOrder(order);
	    return null;

	    // Persist the order and map it to OrdersDto
	    //return ordersMapper.mapToOrdersDto(orderDao.addOrder(ordersMapper.mapToOrders(ordersDto)));
	}

	public List<OrdersDto> listAllOrders(){
		List<Orders> listOrders = orderDao.listAllOrders();
		return listOrders.stream()
                .map(ordersMapper::mapToOrdersDto)
                .collect(Collectors.toList());
	}
	@Override
	public List<OrdersDto> getOrdersByCustomerId(long customerId) {
		List<Orders> listOrders = orderDao.getOrdersByCustomerId(customerId);
		return listOrders.stream()
                .map(ordersMapper::mapToOrdersDto)
                .collect(Collectors.toList());
	}

	@Override
	public long getOrderCount() {
		return orderDao.getOrderCount();
	}

	@Override
	public long getTodaysOrderCount() {
		return orderDao.getTodaysOrderCount();
	}

	@Override
	public double getTotalRevenue() {
		return orderDao.getTotalRevenue();
	}

	@Override
	public Double getTodaysRevenue() {
		return orderDao.getTodaysRevenue();
	}

	public List<OrdersDto> searchOrders(Long orderId, String param) {
		List<Orders> listOrders = orderDao.searchOrders(orderId, param);
		return listOrders.stream()
						.map(ordersMapper::mapToOrdersDto)
						.collect(Collectors.toList());
	}

}
