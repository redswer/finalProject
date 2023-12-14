package com.fox.fib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	@Query("update User u set u.point = :pointParam where u.id = :userId")
	   User updateUserPoint(@Param("pointParam") int pointParam, @Param("userId") String userId);
	
	@Query(nativeQuery = true, value = "select id from user where name = :name and birthday = :birthday and phone_number = :phone_number")
	String findId(@Param("name") String name, @Param("birthday") String birthday, @Param("phone_number") String phone_number);
	
}
