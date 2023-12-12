package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.Faq;
import com.fox.fib.entity.Inquiry;
import com.fox.fib.entity.Notice;
import com.fox.fib.entity.Product;
import com.fox.fib.entity.User;
import com.fox.fib.entity.User_coupon;
import com.fox.fib.repository.FaqRepository;
import com.fox.fib.service.CouponService;
import com.fox.fib.service.FaqService;
import com.fox.fib.service.InquiryService;
import com.fox.fib.service.NoticeService;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/test")
@Log4j2
@AllArgsConstructor
public class TestController {
	
	CouponService couponService;
	User_couponService userCouponService;
	NoticeService noticeService;
	FaqService faqService;
	InquiryService inquiryService;
	ProductService productService;	
	
	private FaqRepository faq_reposityory;
	
	// ****** Server에서 React(Front) Project로 전달================================================================================= 	
	// 쿠폰 리스트
	@GetMapping("/couponList")
	public List<Coupon> couponList() {
		return couponService.selectList();
	} 
	
	// 공지사항 리스트
	@GetMapping("/noticeList")
	public List<Notice> noticeList() {
		return noticeService.selectList();
	} 
	
	// 공지사항 리스트
	@GetMapping("/faqList")
	public List<Faq> faqList() {
		return faqService.selectList();
	} 
	
	// 제품 리스트
	@GetMapping("/productlist")
	public List<Product> productList() {
		return productService.selectList();
	} 

	
	// ****** React(Front) Project에서 Server로 전달================================================================================= 	
	// 유저가 쿠폰 받기
	@PostMapping("/userCouponGet")
	public String userCouponGet(@RequestBody User_coupon user_coupon, User_coupon entity, Model model)  throws IOException {
		String uri = "/userCoupon/userCouponList";
			log.info(user_coupon.getCoupon_code());
			log.info(user_coupon.getId());
		try {
			int getCode = user_coupon.getCoupon_code();
			String getId = user_coupon.getId();
			log.info(getCode);
			log.info(getId);
	      	        
			entity.setCoupon_code(getCode);
			entity.setId(getId);
			log.info("** 쿠폰 받기 성공 => "+userCouponService.save(entity));

			uri = "redirect:userCouponList";
		} catch (Exception e) {
			log.info("** 쿠폰 받기 실패 exception => "+e.toString());
			model.addAttribute("message", "쿠폰 등록에 실패했습니다.");
		}
		return uri;
	}
	
	// FAQ category에 따라 출력
	@GetMapping("/faqList/{category}")
	public ResponseEntity<List<Faq>> faqList(@PathVariable("category") String category) {
		// 리액트에서 넘어온 notice_code 정보 확인
		log.info("전달받은 category : " + category);
			
		try {
			// 쿼리문의 return값들의 리스트에 
			List<Faq> getFaqList = faq_reposityory.getFaqList(category);
			
			List<Faq> filteredList = getFaqList.stream()
		                .filter(faq -> faq.getCategory() != null)
		                .collect(Collectors.toList());
			
			return ResponseEntity.ok(filteredList);

		} catch (Exception e) {
			log.error("회원 문의내역 조회 중 오류 발생: " + e.getMessage(), e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// 유저 1:1문의 내역 보기위한 React에서 서버로 id 전달
//	@GetMapping("/inquiryList/{id}")
//	public List<Inquiry> inquiryList(@PathVariable("id") String id, Inquiry inquiry, Model model)  throws IOException {
//			// 리액트에서 넘어온 notice_code 정보 확인
//			log.info(id);
//		try {
//			// 쿼리문의 return값들의 리스트에 
//			List<Inquiry> getInquiryList = inquiryService.getInquiryList(id);
//			
//	        // 요청받은 정보에서 현재 조회수를 조회
//			log.info("현재 아이디의 문의코드 : " + inquiry.getInquiry_code());
//			log.info("현재 아이디의 문의 아이디 : " + inquiry.getId());
//			log.info("현재 아이디의 문의 제목 : " + inquiry.getTitle());
//			return ResponseEntity.ok(getInquiryList);
//
//		} catch (Exception e) {
//			log.info("회원 문의내역 조회 실패 exception => "+e.toString());
//			model.addAttribute("message", "회원 문의내역 조회에 실패했습니다.");
//		}
//	}
	@GetMapping("/inquiryList/{id}")
	public ResponseEntity<List<Inquiry>> inquiryList(@PathVariable("id") String id) {
			// 리액트에서 넘어온 notice_code 정보 확인
			log.info(id);
		try {
			// 쿼리문의 return값들의 리스트에 
			List<Inquiry> getInquiryList = inquiryService.getInquiryList(id);
			
			List<Inquiry> filteredList = getInquiryList.stream()
		                .filter(inquiry -> inquiry.getId() != null)
		                .collect(Collectors.toList());
			
	        // 요청받은 정보에서 현재 조회수를 조회
			return ResponseEntity.ok(filteredList);

		} catch (Exception e) {
			log.error("회원 문의내역 조회 중 오류 발생: " + e.getMessage(), e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// 유저가 1:1문의 등록
	@PostMapping("/userInquiryRegister")
	public ResponseEntity<?> userInquiryRegister(Inquiry entity)  throws IOException {
		
		MultipartFile check = entity.getInquiry_upload_file();
		
		String realPath = "C:\\Users\\yangs\\Desktop\\pp\\pjt\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
		String inquiry_file, inquiry_file_upload="";
		
		if (check != null && !check.isEmpty()) {
		   inquiry_file = realPath + check.getOriginalFilename(); // 저장 경로
		   check.transferTo(new File(inquiry_file));

		   inquiry_file_upload = check.getOriginalFilename(); // 저장 경로
		}

		entity.setAttached_data(inquiry_file_upload);

		try {
	        
	        log.info("*********" + entity);
			log.info("** 1:1문의 등록 성공 => "+inquiryService.save(entity));
			return ResponseEntity.ok("1:1문의를 등록했습니다.");
		} catch (Exception e) {
			log.info("** 1:1문의 등록 실패 exception => "+e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(":1문의 등록에 실패했습니다. : " + e.toString());
		}
	}
	
	// 조회수 증가
	// https://ssdragon.tistory.com/122 쿠키값으로 조회수 증가 결정 관련 글
	@GetMapping("/increaseView/{notice_code}")
	public int increaseView(@PathVariable("notice_code") int notice_code, Notice notice, User user, Model model)  throws IOException {
			// 리액트에서 넘어온 notice_code 정보 확인
			log.info(notice_code);
		try {
			// 전달받은 notice_code에 맞는 정보를 update
			noticeService.update(notice_code);
			
			// 요청받은 notice_code의 정보를 notice에 저장
			notice = noticeService.selectOne(notice_code);
			
	        // 요청받은 정보에서 현재 조회수를 조회
			log.info("현재 공지사항 번호 : " + notice.getNotice_code());
			log.info("현재 공지사항 조회수 : " + notice.getView());
	        return notice.getView();

		} catch (Exception e) {
			log.info("조회수 증가 실패 exception => "+e.toString());
			model.addAttribute("message", "조회수 증가에 실패했습니다.");
			return 0;
		}
	}
	
}


