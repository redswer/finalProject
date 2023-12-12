package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Review;

public interface ReviewService {

   // 전체 리뷰 조회
   List<Review> findAllDesc();
   
   // 개별 리뷰 조회
   Review selectOne(Long review_code);
   
   // 리뷰 등록, 수정
   Long save(Review entity);
   
   // 리뷰 삭제
   Long delete(Long review_code);
   
}