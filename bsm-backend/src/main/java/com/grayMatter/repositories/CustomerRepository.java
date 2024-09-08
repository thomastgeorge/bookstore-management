package com.grayMatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grayMatter.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	public Customer findByUserUserId(long userId);
	
	 @Query("SELECT c FROM Customer c JOIN c.user u WHERE " +
	           "(c.name LIKE %:param% OR " +
	           "c.mobile LIKE %:param% OR " +
	           "u.email LIKE %:param%)")
	 List<Customer> findByAnyField(@Param("param") String param);


}
