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

	// [1] 기본 정렬.=========================================================================================
	@Override
	public List<Product> selectList() {
		return repository.findAll();
	}

	@Override
	public PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable(Sort.by("title").ascending());
		Page<Product> result = repository.findAll(pageable);
		return new PageResultDTO<>(result);
	}


	// [2] 페이지네이션 React.==================================================================================
	@Override
	public PageResultDTO<Product> selectListSortOfTitle(PageRequestDTO requestDTO, String domestic, String category, String genre) {
		Pageable pageable = requestDTO.getPageable(Sort.by("title").ascending());
		Page<Product> result = repository.showListFromKeywords(pageable, domestic, category, genre);
		return new PageResultDTO<>(result);
	}

	@Override
	public PageResultDTO<Product> selectListSortOfPriceAsc(PageRequestDTO requestDTO, String domestic, String category, String genre) {
		Pageable pageable = requestDTO.getPageable(Sort.by("price").ascending());
		Page<Product> result = repository.findOrderedPriceAsc(pageable, domestic, category, genre);
		return new PageResultDTO<>(result);
	}

	@Override
	public PageResultDTO<Product> selectListSortOfPriceDesc(PageRequestDTO requestDTO, String domestic, String category, String genre) {
		Pageable pageable = requestDTO.getPageable(Sort.by("price").descending());
		Page<Product> result = repository.findOrderedPriceDesc(pageable, domestic, category, genre);
		return new PageResultDTO<>(result);
	}


	@Override
	public PageResultDTO<Product> selectListLimitedPrice(PageRequestDTO requestDTO, String domestic, String category, String genre,
		int minprice, int maxprice) {
		Pageable pageable = requestDTO.getPageable(Sort.by("price").ascending());
		Page<Product> result = repository.selectListLimitedPrice(pageable, domestic, category, genre, minprice, maxprice);
		return new PageResultDTO<>(result);
	}


	@Override
	public PageResultDTO<Product> selectListBestSeller(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable(Sort.by("sellcount").descending());

		Page<Product> result = repository.selectListBestSeller(pageable);

		return new PageResultDTO<>(result);
	}


	// [3] 필요시에 쓰는 커스텀 메소드.==============================================================================
	@Override
	public List<Product> showListFromKeywords22(String domestic, String category, String genre) {
		return repository.showListFromKeywords22(domestic, category, genre);
	}

	// @Override
	// public List<Product> orderedByPriceAsc(String domestic, String category, String genre) {
	// return repository.findOrderedPriceAsc(domestic, category, genre);
	// }

	// @Override
	// public List<Product> orderedByPriceDesc(String domestic, String category, String genre) {
	// return repository.findOrderedPriceDesc(domestic, category, genre);
	// }

	// [4] 기본 내장 메소드.=============================================================================================

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