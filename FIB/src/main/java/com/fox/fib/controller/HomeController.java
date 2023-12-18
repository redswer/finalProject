package com.fox.fib.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.fox.fib.domain.OrderSummaryDTO;
import com.fox.fib.service.InquiryService;
import com.fox.fib.service.Member_paymentService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@AllArgsConstructor
@Log4j2
public class HomeController {

    Member_paymentService memberPaymentService;
    InquiryService inquiryService;
    
    private List<String> generateDateRange(String startDate, String endDate) {
        List<String> dateRange = new ArrayList<>();
        LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        while (!start.isAfter(end)) {
            dateRange.add(start.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            start = start.plusDays(1);
        }
        return dateRange;
    }
    
//    @GetMapping("/home")
//    public String home() {
//        return "home"; // home.jsp 파일의 이름을 확인해주세요.
//    }
    // 브라우저에서 다른 도메인의 리소스에 대한 요청을 차단하는 보안 정책인 CORS가 적용되어 있는지 확인해야 합니다. 
    // 서버 측에서는 응답에 CORS 헤더를 올바르게 설정해야 합니다.
    @GetMapping("/home")
    public String home(HttpServletRequest request, Model model) {
    	LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
    	
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String endDateString = endDate.format(formatter);
        String startDateString = startDate.format(formatter);
        log.info("endDateString : " + endDateString);
        log.info("startDateString : " + startDateString);
        log.info("일별 결과물 : " + memberPaymentService.getDailyOrderSummary(startDateString, endDateString));
        
        List<OrderSummaryDTO> dailyOrderSummary = memberPaymentService.getDailyOrderSummary(startDateString, endDateString);      
        
        
        List<String> dateRange = generateDateRange(startDateString, endDateString);

        // dateRange를 반복하며 dailyOrderSummary에 날짜가 없는 경우, 누락된 날짜에 대한 OrderSummaryDTO를 추가
        for (String date : dateRange) {
            if (dailyOrderSummary.stream().noneMatch(summary -> summary.getOrderDate().equals(date))) {
                dailyOrderSummary.add(new OrderSummaryDTO(date, 0, 0)); // null 대신에 적절한 기본값 사용
            }
        }
        dailyOrderSummary.sort(Comparator.comparing(s -> LocalDate.parse(s.getOrderDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"))));

        
        log.info("dailyOrderSummaryAdd : " + dailyOrderSummary);
        // 일별데이터
        model.addAttribute("dailyOrderSummary", dailyOrderSummary);
//        model.addAttribute("UnAnsweredInquiries", inquiryService.getInquiryList(false));
        return "home"; // adminHome은 관리자 페이지의 JSP 파일명입니다.
    }


//    @GetMapping("/dailyOrderSummary")
//    public ResponseEntity<Map<String, Object>> dailyOrderSummary() {
//        Map<String, Object> responseData = new HashMap<>();
//
//        // 기간 설정 (예: 최근 7일)
//        LocalDate endDate = LocalDate.now();
//        LocalDate startDate = endDate.minusDays(6);
//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String endDateString = endDate.format(formatter);
//        String startDateString = startDate.format(formatter);
//
//        // 일별 주문 통계 데이터 조회
//        List<OrderSummaryDTO> dailyOrderSummary = memberPaymentService.getDailyOrderSummary(startDateString, endDateString);
//
//        // 다른 필요한 데이터들도 responseData에 추가 가능
//
//        responseData.put("dailyOrderSummary", dailyOrderSummary);
//        return ResponseEntity.ok(responseData);
//    }
}