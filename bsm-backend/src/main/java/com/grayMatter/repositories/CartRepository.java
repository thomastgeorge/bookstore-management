package com.grayMatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grayMatter.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
