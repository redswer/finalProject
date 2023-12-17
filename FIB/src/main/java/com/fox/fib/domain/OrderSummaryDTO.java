package com.fox.fib.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderSummaryDTO {
    private String orderDate;       // 주문 날짜 (일별)
    private long dailyOrderCount;    // 일별 주문 건수
    private long dailyOrderAmount;   // 일별 주문 금액
}