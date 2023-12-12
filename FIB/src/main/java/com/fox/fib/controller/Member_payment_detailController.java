package com.fox.fib.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.User;
import com.fox.fib.service.Member_payment_detailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/memberdetailpayment")
@Log4j2
@AllArgsConstructor
public class Member_payment_detailController {
	
	Member_payment_detailService member_payment_detailService;

	// 주문상세 Select
	@PostMapping("/memberpaymentdetaillist")
	public ResponseEntity<?> selectlist(String id, Model model) {

		try {
			member_payment_detailService.selectList(id);

			return ResponseEntity.ok("주문상세 조회 성공");
		} catch (Exception e) {
			System.out.println("주문상세 조회 실패 : " + e.toString());

			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문상세 조회 실패 : " + e.toString());
		}
	}
	
}