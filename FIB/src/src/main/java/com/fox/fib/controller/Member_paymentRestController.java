package com.fox.fib.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Member_payment;
import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.entity.User;
import com.fox.fib.service.CartService;
import com.fox.fib.service.Member_paymentService;
import com.fox.fib.service.Member_payment_detailService;
import com.fox.fib.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/restmemberpayment")
@Log4j2
@AllArgsConstructor
public class Member_paymentRestController {
	
	Member_paymentService member_paymentService;
	Member_payment_detailService member_payment_detailService;
	UserService userService;
	CartService cartService;

	//주문정보, 주문상세 등록 및 회원포인트 수정	
	@PostMapping("memberpaymentinsert")
	public ResponseEntity<?> memberpaymentinsert(
		@RequestBody String paymentDetailData, Member_payment entity, Member_payment_detail detailEntity, User userEntity) throws ParseException {
		
		JSONParser jsonParser = new JSONParser();
		
		JSONObject jsonObject = (JSONObject)jsonParser.parse(paymentDetailData);
		
		JSONArray jsonArray = (JSONArray)jsonParser.parse((String)jsonObject.get("paymentDetailData"));

		try {
			entity.setId((String)jsonObject.get("id"));
			entity.setPayment_date((String)jsonObject.get("payment_date"));
			entity.setPayment_option((String)jsonObject.get("payment_option"));
			entity.setPayment_option_detail((String)jsonObject.get("payment_option_detail"));
			entity.setProduct_amount(Integer.parseInt((String) jsonObject.get("product_amount")));
			entity.setOrigin_price(Integer.parseInt((String)jsonObject.get("origin_price")));
			entity.setFinal_price(Integer.parseInt((String)jsonObject.get("final_price")));
			entity.setRecipient((String)jsonObject.get("recipient"));
			entity.setRecipient_phone_number((String)jsonObject.get("recipient_phone_number"));
			entity.setAddress_zip((String)jsonObject.get("address_zip"));
			entity.setAddress((String)jsonObject.get("address"));
			entity.setAddress_detail((String)jsonObject.get("address_detail"));
			entity.setDelivery_state((String)jsonObject.get("delivery_state"));
			entity.setArrive_date((String)jsonObject.get("arrive_date"));
			
			// 주문정보 등록
			member_paymentService.save(entity);
			
			// 주문코드 MAX 값
			Long maxPaymentCode = member_payment_detailService.findMaxByMember_payment_code();

			// 주문상세 등록
			for(int i = 0; i < jsonArray.size(); i++) {
				JSONObject object = (JSONObject) jsonArray.get(i);
				
				Long detailPayment_code = maxPaymentCode;
				String detailId = (String)jsonObject.get("id");
				Long detailProduct_code = (Long)(object.get("product_code"));
				Long detailProamount = (Long)(object.get("proamount"));
				
				member_payment_detailService.insertPaymentDetail(detailPayment_code, detailId, detailProduct_code, detailProamount);
			}
			
			// 회원포인트 수정
			User userOne =  userService.selectOne((String)jsonObject.get("id"));
			int pointUpdate = userOne.getPoint() + Integer.parseInt((String)jsonObject.get("point"));
			userOne.setPoint(pointUpdate);
			userService.register(userOne);

			// 장바구니 내역 삭제
			if(jsonArray.size() > 1) {
				for(int i = 0; i < jsonArray.size(); i++) {
					JSONObject object = (JSONObject) jsonArray.get(i);
					
					Long cart_code_longType = (Long)object.get("cart_code");
					int cart_code_intType = cart_code_longType.intValue();
			
					cartService.delete(cart_code_intType);
				}
			}

			return ResponseEntity.ok("주문정보 등록 성공");
		} catch (Exception e) {
			System.out.println("주문정보 등록 실패 : " + e.toString());

			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문정보 등록 실패 : " + e.toString());
		}
		
	}
	
}