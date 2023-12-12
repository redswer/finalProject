package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.User;
import com.fox.fib.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	UserService service;
	PasswordEncoder passwordEncoder;
	
//	------------------------------
//	// ** 로그인
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User request) {
		String id = request.getId();
		String password = request.getPassword();	
		
		User entity = service.selectOne(id);
		
		if (entity != null && passwordEncoder.matches(password, entity.getPassword())) {
			return new ResponseEntity<>(entity, HttpStatus.OK);
		} else if (entity == null) {
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
//	-----------------------------------
	// ** 회원가입
	
	@PostMapping("join")
	public ResponseEntity<String> join(@RequestBody User request) {
		
		request.setPassword(passwordEncoder.encode(request.getPassword()));
		
		if (service.selectOne(request.getId()) == null) {
			service.register(request);
			return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("이미 존재하는 아이디입니다.", HttpStatus.UNAUTHORIZED);
		}
	}
//	---------------------------------
	// ** 회원정보 수정
	
	@PostMapping("/update")
	public ResponseEntity<User> memberUpdate(
            @RequestParam(value="uploadfilef", required=false) MultipartFile uploadfilef,
            @RequestParam("password") String password,
            @ModelAttribute User user
    ) throws IOException {
		String realPath = "D:\\JinHyuk_Ahn\\project_3rd\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
		String file1, file2="resources/uploadImages/basicman4.png";
		// => new Image 를 선택한 경우에만 처리하면 됨 
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			
			// => 물리적위치에 저장 (file1)
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
			
			// => Table 저장경로 완성 (file2)
			file2="resources/uploadImages/" + uploadfilef.getOriginalFilename();
			user.setProfile_image(file2);
		} else {
			user.setProfile_image(service.selectOne(user.getId()).getProfile_image());
		}
		
		if (passwordEncoder.matches(password, service.selectOne(user.getId()).getPassword())) {				
			try {
				service.register(user);
				return new ResponseEntity<> (service.selectOne(user.getId()), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity<> (HttpStatus.BAD_GATEWAY);
		}
	}
	
//	-----------------------
	// ** 아이디 찾기
	@PostMapping("/findId")
	public ResponseEntity<String> findId(@RequestBody User request) {
		String res = service.findId(request.getName(), request.getBirthday(), request.getPhone_number());
		if (res != null) {
			return new ResponseEntity<> (res, HttpStatus.OK);
		} else {
			return new ResponseEntity<> ("회원정보 없음", HttpStatus.BAD_GATEWAY);
		}
	}
	
//	-----------------------
	// ** 회원 탈퇴
	@PostMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody User request) {

		if (passwordEncoder.matches(request.getPassword(), service.selectOne(request.getId()).getPassword())) {
			try {
				service.delete(request.getId());
				return new ResponseEntity<> ("탈퇴되었습니다", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<> ("서버 오류", HttpStatus.UNAUTHORIZED);
			}			
		} else {
			return new ResponseEntity<String> ("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_GATEWAY);
		}
	}
	
}
