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

	@GetMapping("/selectAllList")
	public ResponseEntity<?> selectAllList() {
		List<Product> selectedAllList = productservice.selectAllList();
		return ResponseEntity.ok(selectedAllList);
	}

	@GetMapping("/productSelectOne")
	public Product productSelectOne(@RequestParam(name = "productOneParam") String product_code, Product entity) {
		log.info(product_code);
		int pcode = Integer.parseInt(product_code);
		entity = productservice.selectOne(pcode);
		return entity;
	}


	// [1] 제목순. ========================================================================================
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


	// [2] 최저가순. ==========================================================================================
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

	// [3] 최고가순. ==========================================================================================
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

	// [4] 판매량순. ==========================================================================================

	@GetMapping("/productSellCountList")
	public ResponseEntity<?> productSellCountList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productDescendingList인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfSellCount(domestic, category, genre);

			log.info("[113]productDescendingList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productDescendingList 오류");

		}
	}

	// [5] 평점순. ==========================================================================================

	@GetMapping("/productGradeAvgList")
	public ResponseEntity<?> productGradeAvgList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productDescendingList인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfGradeAvg(domestic, category, genre);

			log.info("[113]productDescendingList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productDescendingList 오류");

		}
	}

	// [6] 리뷰순. ==========================================================================================

	@GetMapping("/productViewCountList")
	public ResponseEntity<?> productViewCountList(@RequestParam(name = "domestic") String domestic,
		@RequestParam(name = "category") String category, @RequestParam(name = "genre") String genre) {
		try {
			log.info("productDescendingList인자 정보 : " + domestic + category + genre);

			List<Product> resultList = productservice.selectListSortOfViewCount(domestic, category, genre);

			log.info("[113]productDescendingList 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productDescendingList 오류");

		}
	}

	// [7] 제한가격검색. ==========================================================================================

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

			log.info("[203] bestSeller 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("bestSeller 오류");

		}
	}

	// ======================================================================================================

	@GetMapping("/recentProduct")
	public ResponseEntity<?> recentProduct(@RequestParam(name = "id") String id, @RequestParam(name = "pcode") String pcode,
		Product pentity, RecentView rentity) {
		try {
			log.info("[153]최근방문 상품 확인 : " + id + " & " + pcode);

			if (id != null && !id.isEmpty()) {

				int product_code = Integer.parseInt(pcode);

				pentity = productservice.selectOne(product_code);

				if (recentviewservice.checkDuplicated(id, product_code) == 0) {

					List<RecentView> recentviewList = recentviewservice.selectListForUserId(id);

					if (recentviewList.size() >= 5) {
						recentviewservice.deleteOldest(id);
					}

					rentity.setId(id);
					rentity.setProduct_code(product_code);
					rentity.setProtype(pentity.getProtype());
					rentity.setTitle(pentity.getTitle());
					rentity.setImage(pentity.getImage());
					rentity.setPrice(pentity.getPrice());

					recentviewservice.save(rentity);

					log.info("새 최근본 상품 세이브!");

				} else if (recentviewservice.checkDuplicated(id, product_code) == 1) {

					log.info("중복 제품이라 안 들어감");
					return ResponseEntity.ok("중복 제품이라 안 들어감");

				} // else if

			} else {
				return ResponseEntity.ok("로그인 후 이용 가능");
			}

		} catch (Exception e) {
			log.error("최근방문상품 저장 실패요 : " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("최근방문 상품데이터 저장 실패");
		}
		return ResponseEntity.ok("예외없음");
	}

	// ======================================================================================================

	@GetMapping("/selectRecentProductList")
	public ResponseEntity<?> selectRecentProductList(@RequestParam(name = "id") String id, RecentView rentity) {

		try {
			if (id == null || id.isEmpty()) {
				return ResponseEntity.ok("로그인 후 확인하실 수 있습니다.");
			} else {
				List<RecentView> recentviewList = recentviewservice.selectListForUserId(id);
				return ResponseEntity.ok(recentviewList);
			}

		} catch (Exception e) {
			log.info("최근방문상품 실패요 : " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("최근방문상품출력 예외오류");
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