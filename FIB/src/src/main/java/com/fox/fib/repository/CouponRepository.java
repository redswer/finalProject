package com.fox.fib.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fox.fib.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
}

