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
import com.fox.fib.entity.Review;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.RecentViewService;
import com.fox.fib.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/product")
@Log4j2
@AllArgsConstructor
public class RestProductController {

	ProductService productservice;
	RecentViewService recentviewservice;
	ReviewService reviewservice;

	// ==========================================================================================

	@GetMapping("/productSelectOne")
	public Product productSelectOne(@RequestParam(name = "productOneParam") String product_code, Product entity) {
		log.info(product_code);
		int pcode = Integer.parseInt(product_code);
		entity = productservice.selectOne(pcode);
		return entity;
	}

	// ==========================================================================================

	@GetMapping("/productReviewList")
	public ResponseEntity<?> productReviewList(@RequestParam(name = "pcode") String product_code, Review rentity) {
		try {
			log.info(product_code);
			int pcode = Integer.parseInt(product_code);
			List<Review> resultReviewList = reviewservice.selectProductReviewList(pcode);

			return ResponseEntity.ok(resultList);
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("checkedListOfDefault 오류");

		}
	}

	// ==========================================================================================

	@GetMapping("/productSelectedList2")
	public ResponseEntity<?> productSelectedList2(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productSelectedList2인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfTitle(domestic, category, genre);

			log.info("[59]productSelectedList2 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productSelectedList2 오류");

		}
	}

	// ==========================================================================================

	@GetMapping("/productAscendingList")
	public ResponseEntity<?> productAscendingList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productAscendingList인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfPriceAsc(domestic, category, genre);

			log.info("[59]productAscendingList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productAscendingList 오류");

		}
	}

	// ==========================================================================================

	@GetMapping("/productDescendingList")
	public ResponseEntity<?> productDescendingList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productDescendingList인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfPriceDesc(domestic, category, genre);

			log.info("[113]productDescendingList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productDescendingList 오류");

		}
	}

	// ==========================================================================================

	@GetMapping("/productLimitedPriceList")
	public ResponseEntity<?> productLimitedPriceList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre,
		@RequestParam(name = "minprice") int minprice, @RequestParam(name = "maxprice") int maxprice) {

		try {
			log.info("productLimitedPriceList인자 정보 : " + domestic + category + genre + " & price & " + minprice + maxprice);

			List<Product> resultList = productservice.selectListLimitedPrice(domestic, category, genre, minprice, maxprice);

			log.info("[134] 1차 productLimitedPriceList의 resultList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productLimitedPriceList 오류");

		}
	}

	// ==========================================================================================

	@GetMapping("/bestSeller")
	public ResponseEntity<?> bestSeller() {

		try {
			List<Product> resultList = productservice.selectListBestSeller();

			log.info("[141] 1차 bestSeller의 resultDTO 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("bestSeller 오류");

		}
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

	// ==========================================================================================

//	@GetMapping("/searchTextWord")
//	public ResponseEntity<?> searchTextWord(@RequestParam(name = "domestic") String domestic,
//		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre,
//		@RequestParam(name = "minprice") int minprice, @RequestParam(name = "maxprice") int maxprice,
//		@RequestParam(name = "textword") String textword) {
//
//		try {
//			log.info("productLimitedPriceList인자 정보 : " + domestic + category + genre + " & price & " + minprice + maxprice + textword);
//
//			List<Product> resultList = productservice.selectListLimitedPrice(resultList, domestic, category, genre, minprice, maxprice);
//
//			log.info("[141] 1차 productLimitedPriceList의 resultDTO 확인 : " + resultList.toString());
//
//
//			return ResponseEntity.ok(resultList);
//
//		} catch (Exception e) {
//			log.info(" 삭제 실패 : " + e.toString());
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("checkedListOfDefault 오류");
//
//		}
//	}
//
//	@GetMapping("/productSelectedList")
//	public List<Product> productSelectedList(@RequestParam(name = "domestic") String domestic,
//		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
//		try {
//			log.info("selectedKeyword 정보 : " + domestic + category + genre);
//
//			List<Product> selectedList = productservice.showListFromKeywords(domestic, category, genre);
//
//			log.info("selectedList 확인 : " + selectedList.toString());
//
//			return selectedList;
//		} catch (Exception e) {
//			log.info(" 삭제 실패 : " + e.toString());
//
//		}
//		return null;
//	}

	// @GetMapping("/productLimitedPriceList22222222")
	// public List<Product> productLimitedPriceList22222222(@RequestParam(name = "domestic") String domestic,
	// @RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre,
	// @RequestParam(name = "minprice") int minprice, @RequestParam(name = "maxprice") int maxprice) {
	// try {
	// log.info("limitedpriceParams 정보 : " + domestic + category + genre + minprice + maxprice);
	//
	// List<Product> filteredList = productservice.showListFromKeywords22(domestic, category, genre);
	// // List<Product> filteredList = productservice.orderedByPriceAsc(domestic, category, genre);
	//
	// log.info("filteredList 확인 : " + filteredList.toString());
	//
	// List<Product> limitedPriceList = filteredList.stream()
	// .filter(product -> product.getPrice() >= minprice && product.getPrice() <= maxprice).collect(Collectors.toList());
	//
	// log.info("limitedPriceList 확인 : " + limitedPriceList.toString());
	//
	// // return filteredList;
	// return limitedPriceList;
	//
	// } catch (Exception e) {
	// log.info(" 삭제 실패 : " + e.toString());
	//
	// }
	// return null;
	// }

}