package com.fox.fib.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fox.fib.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
  
	// 리뷰 조회(내림차순 정렬)
	@Query("select r from Review r order by review_code desc")
	List<Review> findAllDesc();
   
}