package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
		
	@Query("SELECT n FROM Notice n ORDER BY n.notice_code DESC")
    List<Notice> orderByNoticeCodeDesc();
	
	@Modifying
	@Transactional
	@Query("update Notice set view = view + 1 where notice_code = :notice_code")
	void update(@Param("notice_code") int notice_code);
}

