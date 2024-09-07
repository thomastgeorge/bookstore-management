package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grayMatter.dto.BookOrderDto;
import com.grayMatter.dto.BulkBookOrderDto;
import com.grayMatter.services.BookOrderService;


@RestController
@RequestMapping("/api/v1/bookorder")
public class BookOrderController {
	
	@Autowired
	private BookOrderService bookOrderService;
	
	@PostMapping()
    public ResponseEntity<String> createBookOrder(@RequestBody BulkBookOrderDto bulkBookOrderDto) {
		bookOrderService.createBookOrder(bulkBookOrderDto.getListBookOrder());
        return ResponseEntity.ok("Orders created successfully");
    }
	
	@GetMapping()
	public List<BookOrderDto> getAllBookOrder(){
		return bookOrderService.getAllBookOrder();
	}
	
	@GetMapping("/{bookOrderId}")
	public BookOrderDto getBookOrderById(@PathVariable long bookOrderId) {
		return bookOrderService.getBookOrderById(bookOrderId);
	}
	

}
