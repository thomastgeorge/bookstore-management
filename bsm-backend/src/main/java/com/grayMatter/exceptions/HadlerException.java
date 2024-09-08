package com.grayMatter.exceptions;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HadlerException {
	
	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException nse){
		return new ResponseEntity<>("The requested id not exist", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(CustomerIdNotFoundException.class)
	public ResponseEntity<String> handleCustomerIdNotFoundException(CustomerIdNotFoundException cinf){
		return new ResponseEntity<>("Customer Id not found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(EmailAlreadyExistException.class)
	public ResponseEntity<String> handleEmailAlreadyExistException(EmailAlreadyExistException eae){
		return new ResponseEntity<>("User with emial already exist", HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(AddressIdNotFoundException.class)
	public ResponseEntity<String> handleAddressIdNotFoundException(AddressIdNotFoundException ainf){
		return new ResponseEntity<>("Address Id not found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BookIdNotFoundException.class)
	public ResponseEntity<String> handleBookIdNotFoundException(BookIdNotFoundException binf){
		return new ResponseEntity<>("Book Id not found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BookOrderIdNotFoundException.class)
	public ResponseEntity<String> handleBookOrderIdNotFoundException(BookOrderIdNotFoundException boinf){
		return new ResponseEntity<>("Book with order for BookOrder Id not found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(InvalidRequestException.class)
	public ResponseEntity<String> handleInvalidRequestException(InvalidRequestException ire){
		return new ResponseEntity<>("Invalid Request", HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoContentFoundException.class)
	public ResponseEntity<String> handleNoContentFoundException(NoContentFoundException ncf){
		return new ResponseEntity<>("No Content Found", HttpStatus.NO_CONTENT);
	}
	
	@ExceptionHandler(CartIdNotFoundException.class)
	public ResponseEntity<String> handleCartIdNotFoundException(CartIdNotFoundException cinf){
		return new ResponseEntity<>("Card Id Not Found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(OrderIdNotFoundException.class)
	public ResponseEntity<String> handleOrderIdNotFoundException(OrderIdNotFoundException oinf){
		return new ResponseEntity<>("Order Id Not Found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ReviewIdNotFoundException.class)
	public ResponseEntity<String> handleReviewIdNotFoundException(ReviewIdNotFoundException rinf){
		return new ResponseEntity<>("Review Id Not Found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(UserIdNotFoundException.class)
	public ResponseEntity<String> handleUserIdNotFoundException(UserIdNotFoundException oinf){
		return new ResponseEntity<>("User Id Not Found", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<String> handleCategoryNotFoundException(CategoryNotFoundException cinf){
		return new ResponseEntity<>("Category Id Not Found", HttpStatus.NOT_FOUND);
	}

}
