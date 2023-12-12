package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.User_coupon;

public interface User_couponService {

	// ** selectList
	List<User_coupon> selectList();

	// ** selectOne
	User_coupon selectOne(int coupon_code);

	// ** insert / update
//	String save(Coupon dto);
	int save(User_coupon entity);

	// ** delete
//	int delete(Coupon coupon_code);
	int delete(int user_coupon_code);


}