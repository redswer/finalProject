package com.fox.fib.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.service.Member_paymentService;
import com.fox.fib.service.Member_payment_detailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/mpdetail")
@Log4j2
@AllArgsConstructor
public class Member_payment_detailController {

	Member_payment_detailService member_payment_detailService;
	Member_paymentService member_paymentService;

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

	@GetMapping("/cancelOrder")
	public ResponseEntity<?> cancelOrder(@RequestParam("paycode") String paycode, @RequestParam("id") String id) {
		try {
			Long payment_code = Long.parseLong(paycode);

			member_paymentService.updateOne(payment_code);
			member_payment_detailService.updatePaymentCancel(payment_code);

			return ResponseEntity.ok("주문취소요청 굿");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문cancel failed : " + e.toString());
		}
	}

	// 리뷰 등록 시 상품 주문 여부 확인
//	@PostMapping("/mpordercheck")
//	public ResponseEntity<?> orderCheck(@RequestBody HashMap<String, Object> orderCheckData) {
//		try {
//			List<Member_payment_detail> mpdList = member_payment_detailService.selectList((String)orderCheckData.get("id"));
//
//			int orderCheck = 0;
//
//			for(int i = 0; i < mpdList.size(); i++) {
//				if(mpdList.get(i).getProduct_code() == (int)orderCheckData.get("product_code")) {
//					Member_payment memberPaymentOne =  member_paymentService.selectOne((Long)mpdList.get(i).getMember_payment_code());
//					orderCheck = memberPaymentOne.getPayment_cancel();
//				}
//			}
//
//			return ResponseEntity.ok(orderCheck);
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문상세 조회 실패 : " + e.toString());
//		}
//	}

}