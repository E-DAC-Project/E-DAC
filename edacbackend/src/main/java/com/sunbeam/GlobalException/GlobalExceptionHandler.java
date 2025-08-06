package com.sunbeam.GlobalException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sunbeam.customException.InvalidInputException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handelConstraintViolationException(ConstraintViolationException e){
		
		System.out.println("Inside Contarint violation");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Given input is not valid");
	}
	
	@ExceptionHandler(InvalidInputException.class)
	public ResponseEntity<?> handelInvalidInputException(InvalidInputException e) {
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
}
