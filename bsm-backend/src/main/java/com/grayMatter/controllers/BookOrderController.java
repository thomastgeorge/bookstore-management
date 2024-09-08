package com.grayMatter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	
	@PostMapping
    public ResponseEntity<String> createBookOrder(@RequestBody BulkBookOrderDto bulkBookOrderDto) {
        bookOrderService.createBookOrder(bulkBookOrderDto.getListBookOrder());
        return new ResponseEntity<>("Orders created successfully", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookOrderDto>> getAllBookOrder() {
        List<BookOrderDto> orders = bookOrderService.getAllBookOrder();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{bookOrderId}")
    public ResponseEntity<BookOrderDto> getBookOrderById(@PathVariable long bookOrderId) {
        BookOrderDto bookOrderDto = bookOrderService.getBookOrderById(bookOrderId);
        if (bookOrderDto != null) {
            return new ResponseEntity<>(bookOrderDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	

}
