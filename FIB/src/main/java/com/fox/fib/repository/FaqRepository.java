package com.fox.fib.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {

//	@Query("SELECT f FROM Faq f ORDER BY f.faq_code DESC")
//  List<Faq> orderByFaqCodeDesc();
//	
//	@Transactional
//	@Query("select f from Faq f where f.category = :category ")
//	List<Faq> getFaqList(@Param("category") String category);
	
//	@Transactional
//	@Query("select f from Faq f ORDER BY f.faq_code DESC")
//	Page<Faq> getFaqList(Pageable pageable);	
	
//	@Transactional
//	@Query("select f from Faq f where ORDER BY f.faq_code DESC")
//	Page<Faq> getFaqList(Pageable pageable);	
	
	@Transactional
//	@Query("select f from Faq f where category=:category ORDER BY f.faq_code DESC")
//    @Query("SELECT f FROM Faq f " +
//            "WHERE (:category IS NULL OR :category = '' OR f.category = :category) " +
//            "ORDER BY f.faq_code DESC")
    @Query("SELECT f FROM Faq f WHERE f.category=:category ORDER BY f.faq_code DESC")
	Page<Faq> getPageFaqList(@Param("category") String category, Pageable pageable);
	
	@Transactional
	@Query("SELECT f FROM Faq f ORDER BY f.faq_code DESC")
	Page<Faq> getPageFaqList2(Pageable pageable);
}

