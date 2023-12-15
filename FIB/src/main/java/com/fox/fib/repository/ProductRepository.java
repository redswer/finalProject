package com.fox.fib.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	@Override
	Page<Product> findAll(Pageable pageable);

	// ============================================================================================================================

	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic)" + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) order by p.title asc")
	List<Product> selectListSortOfTitle(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) ORDER BY p.price ASC")
	List<Product> selectListSortOfPriceAsc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) order by p.price desc")
	List<Product> selectListSortOfPriceDesc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);


	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic) " + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre) and (p.price between :minprice and :maxprice) order by p.price asc")
	List<Product> selectListLimitedPrice(String domestic, String category, String genre, int minprice, int maxprice);


	@Query(nativeQuery = true, value = "SELECT * FROM product p ORDER BY p.sellcount DESC")
	List<Product> selectListBestSeller();


	// ============================================================================================================================

	@Query("SELECT p FROM Product p WHERE (:domestic = '0' OR p.domestic = :domestic)" + "AND (:category = '0' OR p.category = :category) "
		+ "AND (:genre = '0' OR p.genre = :genre)")
	List<Product> showListFromKeywords22(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre);

//	@Query(nativeQuery = true, value = "")
//	List<Product> selectWithReview();



}