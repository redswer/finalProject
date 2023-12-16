package com.fox.fib.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.fox.fib.domain.User_couponId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(User_couponId.class)
public class User_coupon implements Serializable {

	@Id
	private String id;
	
	@Id
	private int coupon_code;
	
	private boolean use_check;
}
