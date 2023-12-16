package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentView extends BaseEntity {
	@Id

	private String id;        // 1. 아이디

	private int product_code; // 2. 제품코드 (primary key)

	private String protype; // 3. 제품분류코드 (책 or 도서제품)

	private String title; // 4. 제품명

	private String image; // 5. 메인이미지

	private int price; // 6. 제품가격

	@Transient                         // SQL에서 제외시켜야함
	private MultipartFile uploadfilef; // => form 의 Upload_File 정보를 전달받기위한 필드 MultipartFile (Interface) -> CommonsMultipartFile


}