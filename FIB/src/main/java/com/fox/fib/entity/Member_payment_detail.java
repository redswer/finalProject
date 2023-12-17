package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member_payment_detail {
	@Id
	private Long member_payment_code;
	private String id;
	private int product_code;
	private int proamount;
	
	private String payment_date;
	private int origin_price;
	private int final_price;
	private String delivery_state;
	private String arrive_date;
	
	private String protype;
	private String domestic;
	private String title;
	private String image;
	private int price;
}
