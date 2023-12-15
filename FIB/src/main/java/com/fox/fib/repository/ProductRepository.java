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
	Page<Product> showListFromKeywords(Pageable pageable, @Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);

	// ORDER BY p.price ASC
	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) ORDER BY p.price ASC")
	Page<Product> findOrderedPriceAsc(Pageable pageable, @Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);

	// ORDER BY p.price desc
	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) ")
	Page<Product> findOrderedPriceDesc(Pageable pageable, @Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) and (p.price between :minprice and :maxprice)")
	Page<Product> selectListLimitedPrice(Pageable pageable, String domestic, String category, String genre, int minprice, int maxprice);


	@Query("SELECT p FROM Product p ORDER BY p.sellcount DESC")
	Page<Product> selectListBestSeller(Pageable pageable);



	@Override
	Page<Product> findAll(Pageable pageable);

	// ============================================================================================================================

	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic)" + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre)")
	List<Product> showListFromKeywords22(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);



}