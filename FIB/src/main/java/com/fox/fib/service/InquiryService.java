package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Inquiry;

public interface InquiryService {

	// ** selectList
	List<Inquiry> selectList();

	// ** selectOne
	Inquiry selectOne(int inquiry_code);

	// ** insert / update
	String save(Inquiry entity);

	// ** delete
	int delete(int inquiry_code);
	
	// 내 문의내역 확인하는 service
	List<Inquiry> getInquiryList(String id);

}