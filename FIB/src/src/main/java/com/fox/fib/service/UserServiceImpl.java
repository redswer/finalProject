package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.User;
import com.fox.fib.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	private final UserRepository repository;
	
	// ** 회원가입/ 회원정보 수정
	@Override
	public String register(User entity) {	
		repository.save(entity);
		return entity.getId();
	}
	
	// ** 로그인 
	@Override
	public User selectOne(String id) {
		Optional<User> result = repository.findById(id);
		
		if (result.isPresent()) {
			return result.get();
		} else {			
			return null;
		}
	}
	
	// ** 아이디 찾기
	public String findId(String name, String birthday, String phone_number) {
		return repository.findId(name, birthday, phone_number);
	}
	
	// ** 관리자 (회원 리스트 출력)
	@Override
	public List<User> selectList() {
		return repository.findAll();
	}
	
	// ** 회원 탈퇴
	@Override
	public String delete(String id) {
		repository.deleteById(id);
		return id;
	}
	
	@Override
    public User updateUserPoint(int pointParam, String userId) {
       return repository.updateUserPoint(pointParam, userId);
    }
}
