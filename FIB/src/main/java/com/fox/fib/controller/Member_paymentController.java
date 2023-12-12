package com.fox.fib.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fox.fib.entity.Member_payment;
import com.fox.fib.service.Member_paymentService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/memberPayment")
@Log4j2
@AllArgsConstructor
public class Member_paymentController {
	
	Member_paymentService member_paymentService;
		
	// 주문정보 조회(내림차순 정렬)
	@GetMapping("/memberPaymentList")
	public void memberPaymentList(Model model, Member_payment entity) {
		model.addAttribute("memberPaymentData", member_paymentService.selectList());
	}
	
	// 주문내역 취소
	@PostMapping("/memberPaymentCancel")
	public String memberPaymentCancel(@RequestBody Long member_payment_code) {
		
		member_paymentService.deleteOne(member_payment_code);

		return "memberPayment/memberPaymentList";
	}
	
}