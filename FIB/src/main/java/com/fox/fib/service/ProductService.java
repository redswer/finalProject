package com.fox.fib.service;

import java.util.List;

import com.fox.fib.domain.PageRequestDTO;
import com.fox.fib.domain.PageResultDTO;
import com.fox.fib.entity.Product;

public interface ProductService {

	public List<Product> selectList();

	//============================================================================================

	public List<Product> showListFromKeywords(String domestic, String category, String genre);

	public List<Product> orderedByPriceAsc(String domestic, String category, String genre);

	public List<Product> orderedByPriceDesc(String domestic, String category, String genre);

	public List<Product> searchLimitedPrice(String domestic, String category, String genre, int minPrice, int maxPrice);

	//============================================================================================
	public Product selectOne(int product_code);

	public int save(Product entity);

	public int delete(int product_code);
	//============================================================================================

	PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO);


}