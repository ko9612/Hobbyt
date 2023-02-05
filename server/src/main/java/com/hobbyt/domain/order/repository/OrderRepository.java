package com.hobbyt.domain.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.order.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>, CustomOrderRepository {
}
