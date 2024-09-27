package com.grayMatter.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grayMatter.entities.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

	List<Orders> findByCustomerCustomerId(long customerId);

	@Query("SELECT SUM(o.totalTotal) FROM Orders o WHERE o.orderDate = ?1")
	Double findTodaysRevenue(Date date);

	@Query("SELECT COUNT(o.id) FROM Orders o WHERE o.orderDate = ?1")
	long countTodaysOrders(Date date);

    @Query("SELECT o FROM Orders o JOIN o.customer c JOIN c.user u WHERE " +
           "(o.orderId = :orderId OR " +
           "c.name LIKE %:param% OR " +
           "u.email LIKE %:param%)")
    List<Orders> searchOrders(@Param("orderId") Long orderId, @Param("param") String param);

}
