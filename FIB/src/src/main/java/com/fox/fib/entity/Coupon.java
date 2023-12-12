package com.fox.fib.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Coupon extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int coupon_code;
	
	@Column(nullable=false)
	private String title;
	
	private int discount_rate;
	
	private int max;
	
	private String image;
	
	@Column(nullable=false)
	private String start;
	
	@Column(nullable=false)
	private String end;
	
	@Transient
	private MultipartFile uploadfilef;
	
}
