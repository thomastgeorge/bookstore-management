package com.grayMatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BsmBackendApplication {

	//Logger logger = LoggerFactory.getLogger(BsmBackendApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(BsmBackendApplication.class, args);
		System.out.println("Server Up and Running!!!");
	}

}
