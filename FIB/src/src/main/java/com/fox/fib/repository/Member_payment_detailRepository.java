package com.fox.fib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.Member_payment_detail;

public interface Member_payment_detailRepository extends JpaRepository<Member_payment_detail, Long> {
	
	// 주문상세 Select
	@Query("select m from Member_payment_detail m where id = :userId")
	List<Member_payment_detail> selectList(@Param("userId") String userId);
	
	// 주문코드 MAX 값 Select
	@Query("select max(m.member_payment_code) from Member_payment m")
	Optional<Long> findMaxByMember_payment_code();
	
	// 주문상세 등록
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "insert into member_payment_detail (member_payment_code, id, product_code, amount) " +
		       "values (:detailPayment_code, :detailId, :detailProduct_code, :detailProamount)")
	int insertPaymentDetail(@Param("detailPayment_code") Long detailPayment_code, @Param("detailId") String detailId,
			@Param("detailProduct_code") Long detailProduct_code, @Param("detailProamount") Long detailProamount);

}