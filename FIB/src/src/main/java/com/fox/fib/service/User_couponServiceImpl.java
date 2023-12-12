package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.User_coupon;
import com.fox.fib.repository.User_couponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class User_couponServiceImpl implements User_couponService {
	
	private final User_couponRepository repository;

	// selectList
	@Override
    public List<User_coupon> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public User_coupon selectOne(int user_coupon_code) {
    	Optional<User_coupon> result = repository.findById(user_coupon_code);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    // insert / update
    // 수정시 수정성공한 시간으로 modDate 업데이트 되게.
    @Override
	public int save(User_coupon entity) {
//    	if (entity != null) {
//    		entity.setModDate(LocalDateTime.now());
//        }
    	repository.save(entity); // 저장 또는 수정
    	return entity.getUser_coupon_code(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(int user_coupon_code) {
    	repository.deleteById(user_coupon_code);
    	return user_coupon_code; // 삭제 후 key return
    }
	
	


}