package com.fox.fib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	@Query("SELECT c FROM Cart c WHERE c.id = :id")
	List<Cart> findListByLoginID(@Param("id") String loginID);


	@Query("SELECT c FROM Cart c WHERE c.id = :id AND c.product_code = :product_code")
	Optional<Cart> checkByIdPcode(@Param("id") String loginID, @Param("product_code") int product_code);

	@Transactional
	@Modifying
	@Query("UPDATE Cart c SET c.proamount = c.proamount + :proamount WHERE c.id = :id AND c.product_code = :product_code")
	int addDuplicated(@Param("id") String loginID, @Param("product_code") int product_code, @Param("proamount") int proamount);

	@Transactional
	@Modifying
	@Query("UPDATE Cart c SET c.proamount = :proamount WHERE c.cart_code = :cart_code")
	int updateProamount(@Param("cart_code") int cart_code, @Param("proamount") int proamount);



}

