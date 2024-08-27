package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.BookOrder;

public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {

}
