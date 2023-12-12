package com.fox.fib.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.Notice;
import com.fox.fib.repository.NoticeRepository;


public interface NoticeService {

	// ** selectList
	List<Notice> selectList();

	// ** selectOne
	Notice selectOne(int notice_code);
	
	// 조회수 업데이트를 위한 update
	void update(int notice_code);

	// ** insert / update
	int save(Notice entity);

	// ** delete
	int delete(int notice_code);

}