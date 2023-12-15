package com.fox.fib.service;

import java.util.List;

import com.fox.fib.domain.PageRequestDTO;
import com.fox.fib.domain.PageResultDTO;
import com.fox.fib.entity.Product;

public interface ProductService {

	// [1] 페이지네이션 React.==================================================================================

	public List<Product> selectList();

	PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO);

	// [2] 페이지네이션 React.==================================================================================

	PageResultDTO<Product> selectListSortOfTitle(PageRequestDTO requestDTO, String domestic, String category, String genre);

	PageResultDTO<Product> selectListSortOfPriceAsc(PageRequestDTO requestDTO, String domestic, String category, String genre);

	PageResultDTO<Product> selectListSortOfPriceDesc(PageRequestDTO requestDTO, String domestic, String category, String genre);


	PageResultDTO<Product> selectListLimitedPrice(PageRequestDTO requestDTO, String domestic, String category, String genre, int minprice,
		int maxprice);

	PageResultDTO<Product> selectListBestSeller(PageRequestDTO requestDTO);


	// ============================================================================================
	public List<Product> showListFromKeywords22(String domestic, String category, String genre);

	// public List<Product> orderedByPriceAsc(String domestic, String category, String genre);

	// public List<Product> orderedByPriceDesc(String domestic, String category, String genre);
	// ============================================================================================
	public Product selectOne(int product_code);

	public int save(Product entity);

	public int delete(int product_code);




	// ============================================================================================



}