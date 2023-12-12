package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {

	@Query("SELECT f FROM Faq f ORDER BY f.faq_code DESC")
    List<Faq> orderByFaqCodeDesc();
	
	@Transactional
	@Query("select f from Faq f where f.category = :category ")
	List<Faq> getFaqList(@Param("category") String category);
}

