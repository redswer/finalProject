package com.fox.fib.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.service.Member_payment_detailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/mpdetail")
@Log4j2
@AllArgsConstructor
public class Member_payment_detailController {

	Member_payment_detailService member_payment_detailService;

	// 주문상세 Select
	@GetMapping("/mpdList")
	public ResponseEntity<?> selectlist(String id) {

		try {
			List<Member_payment_detail> mpdList = member_payment_detailService.selectList(id);

			return ResponseEntity.ok(mpdList);
		} catch (Exception e) {
			System.out.println("주문상세 조회 실패 : " + e.toString());

			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문상세 조회 실패 : " + e.toString());
		}
	}

}