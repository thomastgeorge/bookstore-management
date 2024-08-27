package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
