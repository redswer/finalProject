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

	@Query("select p from Product p")
	List<Product> selectAllList();

	// [2] 리액트 메소드. ==================================================================================================================

	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = '0' OR p.domestic = :domestic)"
		+ "AND (:category = '0' OR p.category = :category) AND (:genre = '0' OR p.genre = :genre) order by p.title asc")
	List<Product> selectListSortOfTitle(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 1.제목순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) AND (:genre = '0' OR p.genre = :genre) ORDER BY p.price ASC")
	List<Product> selectListSortOfPriceAsc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 2.최저가순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) " + "AND (:genre = '0' OR p.genre = :genre) order by p.price desc")
	List<Product> selectListSortOfPriceDesc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 3.최고가순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) " + "AND (:genre = '0' OR p.genre = :genre) order by p.sellcount desc")
	List<Product> selectListSortOfSellCount(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 4.판매량순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) " + "AND (:genre = '0' OR p.genre = :genre) order by p.gradeavg desc")
	List<Product> selectListSortOfGradeAvg(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 5.평점순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) " + "AND (:genre = '0' OR p.genre = :genre) order by p.viewcount desc")
	List<Product> selectListSortOfViewCount(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 6.리뷰순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = '0' OR p.domestic = :domestic) "
		+ "AND (:category = '0' OR p.category = :category) AND (:genre = '0' OR p.genre = :genre) and (p.price between :minprice and :maxprice) order by p.price asc")
	List<Product> selectListLimitedPrice(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre, @Param("minprice") int minprice, @Param("maxprice") int maxprice); // 7.제한가격검색


	@Query(value = "SELECT * FROM product p WHERE p.protype = 1 ORDER BY p.sellcount DESC LIMIT 20", nativeQuery = true)
	List<Product> selectListBestSeller();

//	@Query(value = "SELECT * FROM product p ORDER BY p.sellcount DESC LIMIT 20", nativeQuery = true)
//	List<Product> selectListBestSeller();


	// ============================================================================================================================

//	@Query(nativeQuery = true, value = "")
//	List<Product> selectWithReview();



}