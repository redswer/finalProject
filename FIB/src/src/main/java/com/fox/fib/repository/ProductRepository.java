package com.fox.fib.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic)" + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre)")
	List<Product> showListFromKeywords(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) ORDER BY p.price ASC")
	List<Product> findOrderedPriceAsc(@Param("domestic") String domestic, @Param("category") String category, @Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) ORDER BY p.price DESC")
	List<Product> findOrderedPriceDesc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) " + "AND (p.price >= :minprice) " + "AND (p.price <= :maxprice)")
	List<Product> showLimitedPrice(@Param("domestic") String domestic, @Param("category") String category, @Param("genre") String genre,
		@Param("minprice") int minprice, @Param("maxprice") int maxprice);

	@Override
	Page<Product> findAll(Pageable pageable);


}