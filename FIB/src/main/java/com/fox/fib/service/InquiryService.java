package com.fox.fib.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fox.fib.entity.Faq;
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
	Page<Inquiry> getInquiryList(String id, Pageable pageable);
	
	// 내 문의내역 확인하는 service
	List<Inquiry> getInquiryList(boolean answer_check);
	
	Page<Inquiry> getUnanswerInquiryList(Boolean answer_check, Pageable pageable);
}