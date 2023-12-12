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

	private final String PCODE = "product_code";

	@Override
	public List<Product> selectList() {
		return repository.findAll();
	}

	//============================================================================================

	@Override
	public PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO) {

		System.out.println("1111111");
		Pageable pageable = requestDTO.getPageable(Sort.by("title").ascending());

		System.out.println("2222222222");
		Page<Product> result = repository.findAll(pageable);


		System.out.println("333333333333333");
		return new PageResultDTO<>(result);
	}

	@Override
	public List<Product> showListFromKeywords(String domestic, String category, String genre) {
		return repository.showListFromKeywords(domestic, category, genre);
	}

	@Override
	public List<Product> orderedByPriceAsc(String domestic, String category, String genre) {
		return repository.findOrderedPriceAsc(domestic, category, genre);
	}

	@Override
	public List<Product> orderedByPriceDesc(String domestic, String category, String genre) {
		return repository.findOrderedPriceDesc(domestic, category, genre);
	}

	@Override
	public List<Product> searchLimitedPrice(String domestic, String category, String genre, int minPrice, int maxPrice) {
		log.info("[72]searchLimtedPrice 값 들어가나 확인 : " + domestic + " & " + category + " & " + genre + " & " + minPrice + " & " + maxPrice);
		return repository.showLimitedPrice(domestic, category, genre, minPrice, maxPrice);
	}


	//========================================================================================================
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

	//========================================================================================================

}

