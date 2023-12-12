package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Faq;



public interface FaqService {
	
	// ** selectList
	List<Faq> selectList();

	// ** selectOne
	Faq selectOne(int faq_code);

	// ** insert / update
	String save(Faq entity);

	// ** delete
	int delete(int faq_code);

	List<Faq> getFaqList(String category);

}