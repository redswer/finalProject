package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Member_payment;

public interface Member_paymentService {
	
	// 주문정보 조회(내림차순 정렬)
	List<Member_payment> selectList();
	
	// 주문정보 등록
	Long save(Member_payment entity);
	
	// 주문정보 삭제
	int deleteOne(Long member_payment_code);
	
}
