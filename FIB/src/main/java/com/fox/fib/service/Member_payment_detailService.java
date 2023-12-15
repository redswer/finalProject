package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Member_payment_detail;

public interface Member_payment_detailService {
	
	// 주문상세 Select
	List<Member_payment_detail> selectList(String id);
	
	// 특정 주문코드를 가진 주문상세 select
	List<Member_payment_detail> selectPaymentCode(Long member_payment_code);
	
	// 주문코드 MAX 값 Select
	Long findMaxByMember_payment_code();
	
	// 주문상세 등록
	int insertPaymentDetail(Long payment_code, String userId, int product_code, int proamount);
	
	// 주문상세 수정
//	Long save(Member_payment_detail entity);
	
}
