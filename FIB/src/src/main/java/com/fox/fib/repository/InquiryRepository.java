package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
	
	@Query("SELECT i FROM Inquiry i ORDER BY i.inquiry_code DESC")
    List<Inquiry> orderByInquiryCodeDesc();
	
	@Transactional
	@Query("select i from Inquiry i where i.id = :id ")
	List<Inquiry> getInquiryList(@Param("id") String id);
}

