package com.fox.fib.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Product;
import com.fox.fib.entity.RecentView;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.RecentViewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/product")
@Log4j2
@AllArgsConstructor
public class RestProductController {

	ProductService productservice;
	RecentViewService recentviewservice;

	// ==========================================================================================

	@GetMapping("/productSelectOne")
	public Product productSelectOne(@RequestParam(name = "productOneParam") String product_code, Product entity) {
		log.info(product_code);
		int pcode = Integer.parseInt(product_code);
		entity = productservice.selectOne(pcode);
		return entity;
	}


	// ==========================================================================================

	@GetMapping("/productSelectedList")
	public List<Product> productSelectedList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("selectedKeyword 정보 : " + domestic + category + genre);

			List<Product> selectedList = productservice.showListFromKeywords(domestic, category, genre);

			log.info("selectedList 확인 : " + selectedList.toString());

			return selectedList;
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());

		}
		return null;
	}

	// ==========================================================================================

	//	@GetMapping("/productSelectedList")
	//	public ResponseEntity<?> productSelectedList(@RequestParam(name = "domestic") String domestic,
	//		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre, int page, int size) {
	//		try {
	//			log.info("selectedKeyword 정보 : " + domestic + category + genre);
	//
	//			List<Product> selectedList = productservice.findSelectedAllByKeywords(domestic, category, genre);
	//
	//			PageRequestDTO requestDTO = PageRequestDTO.builder().page(page).size(size).build();
	//
	//			PageResultDTO<Product> resultDTO = productservice.selectListPageNation(requestDTO);
	//
	//			log.info("selectedList 확인 : " + resultDTO.toString());
	//
	//			return ResponseEntity.ok(resultDTO);
	//		} catch (Exception e) {
	//			log.info(" 삭제 실패 : " + e.toString());
	//		}
	//		return null;
	//	}

	// ==========================================================================================

	@GetMapping("/productAscendingList")
	public List<Product> productAscendingList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productAscendingList 정보 : " + domestic + category + genre);
			List<Product> selectedList = productservice.orderedByPriceAsc(domestic, category, genre);
			log.info("selectedList 확인 : " + selectedList.toString());
			return selectedList;

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());


		}
		return null;
	}

	// ==========================================================================================

	@GetMapping("/productDescendingList")
	public List<Product> productDescendingList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("selectedKeyword 정보 : " + domestic + category + genre);
			List<Product> selectedList = productservice.orderedByPriceDesc(domestic, category, genre);
			log.info("selectedList 확인 : " + selectedList.toString());
			return selectedList;
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());


		}
		return null;
	}

	// ======================================================================================================

	@GetMapping("/productLimitedPriceList")
	public List<Product> productLimitedPriceList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre,
		@RequestParam(name = "min") String minPrice, @RequestParam(name = "max") String maxPrice) {
		try {
			log.info("[105]selectedKeyword 정보 : " + domestic + " & " + category + " & " + genre + " & " + minPrice + " & " + maxPrice);

			int min = Integer.parseInt(minPrice);
			int max = Integer.parseInt(maxPrice);

			List<Product> limitedPriceList = productservice.searchLimitedPrice(domestic, category, genre, min, max);

			log.info("[112]productLimitedPriceList 확인 : {} " + limitedPriceList.toString());

			return limitedPriceList;

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());


		}
		return null;
	}

	// ======================================================================================================

	@GetMapping("/recentView")
	public ResponseEntity<?> recentView(@RequestParam(name = "id") String id, @RequestParam(name = "pcode") String pcode, Product pentity,
		RecentView rentity) {

		try {
			log.info("[126]최근방문 pcode 확인 : " + pcode);

			int product_code = Integer.parseInt(pcode);

			pentity = productservice.selectOne(product_code);
			rentity.setId(id);
			rentity.setProduct_code(product_code);
			rentity.setProtype(pentity.getProtype());
			rentity.setTitle(pentity.getTitle());
			rentity.setImage(pentity.getImage());
			rentity.setPrice(pentity.getPrice());

			recentviewservice.save(rentity);

			return ResponseEntity.ok("잘 들어갓슈");
		} catch (Exception e) {
			log.info("최근방문상품 실패요 : " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("최근방문 상품데이터 저장 실패");
		}

	}

	// ======================================================================================================

	@GetMapping("/showRecentViewList")
	public List<RecentView> showRecentViewList(@RequestParam(name = "id") String id, RecentView rentity) {

		try {
			List<RecentView> recentviewList = recentviewservice.selectListById(id);

			return recentviewList;
		} catch (Exception e) {
			log.info("최근방문상품 실패요 : " + e.toString());
			return null;
		}

	}


}