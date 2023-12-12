package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Coupon;

public interface CouponService {

	// ** selectList
	List<Coupon> selectList();

	// ** selectOne
	Coupon selectOne(int coupon_code);

	// ** insert / update
//	String save(Coupon dto);
	int save(Coupon entity);

	// ** delete
//	int delete(Coupon coupon_code);
	int delete(int coupon_code);


}