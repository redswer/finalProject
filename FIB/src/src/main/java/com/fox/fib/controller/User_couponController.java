package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.User_coupon;
import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/userCoupon")
@AllArgsConstructor
@Log4j2
public class User_couponController {
	
	User_couponService service;
	
	// userCouponList 
	@GetMapping("/userCouponList")
	public void userCouponList(Model model) {
		model.addAttribute("userCouponList", service.selectList());
	}
	// 테스트중
//	@PostMapping("/userCouponGet")
//	public String userCouponGet(HttpServletRequest request, @RequestBody Map<String, Object> requestData, User_coupon entity, Model model)  throws IOException {
//		String uri = "/userCoupon/userCouponList";
//			
//		try {
//			int getCode = (int) requestData.get("coupon_code");
//
//	        // 사용자 ID
//	        String userId = (String) requestData.get("userId");
//			log.info("** 쿠폰 받기 성공 => "+service.save(entity));
//			model.addAttribute("message", "새 쿠폰이 등록되었습니다.");
//			entity.setCoupon_code(getCode);
//			uri = "redirect:userCouponList";
//		} catch (Exception e) {
//			log.info("** 쿠폰 받기 실패 exception => "+e.toString());
//			model.addAttribute("message", "쿠폰 등록에 실패했습니다.");
//		}
//		return uri;
//	}
	
//	@PostMapping("/userCouponGet")
//	public String userCouponGet(HttpServletRequest request, @RequestBody Map<String, Object> requestData, Model model) throws IOException {
//	    String uri = "/userCoupon/userCouponList";
//	    
//	    try {
//	        // 쿠폰 정보
//	        String couponTitle = (String) requestData.get("couponTitle");
//	        String couponImage = (String) requestData.get("couponImage");
//
//	        // 사용자 ID
//	        String userId = (String) requestData.get("userId");
//
//	        // 쿠폰과 사용자 ID를 이용한 처리
//	        // ...
//
//	        log.info("** 쿠폰 받기 성공 => " + service.save(entity));
//	        model.addAttribute("message", "새 쿠폰이 등록되었습니다.");
//	        uri = "redirect:couponRegister";
//	    } catch (Exception e) {
//	        log.info("** 쿠폰 받기 실패 exception => " + e.toString());
//	        model.addAttribute("message", "쿠폰 등록에 실패했습니다.");
//	    }
//	    return uri;
//	}
//	주의할 점은 @RequestBody Map<String, Object> requestData을 통해 전송된 데이터를 받아 처리했습니다. 실제로는 쿠폰 정보와 사용자 ID를 담은 DTO 클래스를 만들어 사용하는 것이 좋습니다. 또한, 클라이언트에서 사용자 ID를 가져오는 getUserId 함수는 실제로 로그인 정보를 가져오거나, 사용자가 입력한 ID를 사용하는 등의 로직이 구현되어야 합니다.
}
