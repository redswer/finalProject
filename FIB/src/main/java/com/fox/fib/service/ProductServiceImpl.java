package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fox.fib.domain.PageRequestDTO;
import com.fox.fib.domain.PageResultDTO;
import com.fox.fib.entity.Product;
import com.fox.fib.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RequiredArgsConstructor
@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

	private final ProductRepository repository;

	// [1] 관리자 페이지.=========================================================================================
	@Override
	public List<Product> selectList() {
		return repository.findAll();
	}

	@Override
	public List<Product> selectAllList() {
		return repository.selectAllList();
	}

	@Override
	public PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable(Sort.by("title").ascending());
		Page<Product> result = repository.findAll(pageable);
		return new PageResultDTO<>(result);
	}


	// [2] 리액트 메소드.==============================================================================

	@Override // 1.제목순
	public List<Product> selectListSortOfTitle(String domestic, String category, String genre) {
		return repository.selectListSortOfTitle(domestic, category, genre);
	}

	@Override // 2.최저가순
	public List<Product> selectListSortOfPriceAsc(String domestic, String category, String genre) {
		return repository.selectListSortOfPriceAsc(domestic, category, genre);
	}

	@Override // 3.최고가순
	public List<Product> selectListSortOfPriceDesc(String domestic, String category, String genre) {
		return repository.selectListSortOfPriceDesc(domestic, category, genre);
	}

	@Override // 4.판매량순
	public List<Product> selectListSortOfSellCount(String domestic, String category, String genre) {
		return repository.selectListSortOfSellCount(domestic, category, genre);
	}

	@Override // 5.평점순
	public List<Product> selectListSortOfGradeAvg(String domestic, String category, String genre) {
		return repository.selectListSortOfGradeAvg(domestic, category, genre);
	}

	@Override // 6.리뷰순
	public List<Product> selectListSortOfViewCount(String domestic, String category, String genre) {
		return repository.selectListSortOfViewCount(domestic, category, genre);
	}

	@Override // 7.제한가격검색
	public List<Product> selectListLimitedPrice(String domestic, String category, String genre, int minprice, int maxprice) {
		return repository.selectListLimitedPrice(domestic, category, genre, minprice, maxprice);
	}

	@Override // 8.베스트셀러
	public List<Product> selectListBestSeller() {
		return repository.selectListBestSeller();
	}


	// [3] 기본 내장 메소드.=============================================================================================

	@Override
	public Product selectOne(int product_code) {
		Optional<Product> result = repository.findById(product_code);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	@Override
	public int save(Product entity) {
		repository.save(entity);                             // 저장 또는 수정
		return entity.getProduct_code();           // 저장후 key return
	}

	@Override
	public int delete(int product_code) {
		repository.deleteById(product_code);
		return product_code;
	}


	// =============================================================================================끝



}