import React from "react";
import './SearchResultPage.css'
import { Link, useSearchParams } from "react-router-dom";

function SearchResultPage() {
    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get("search");
    const searchResults = JSON.parse(localStorage.getItem("searchResults"));
    // 데이터 받아오기

    return (
        <div className="search_result_page">
            <h2> "{searchKeyword}" 검색 결과 : {searchResults.length}개</h2>
            <hr />
            {searchResults.length === 0 ? (
                <p className="not_found_search">"검색 결과를 찾을 수 없습니다"</p>
            ) : (
                <ul className="search_result_list">
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <div className="search_result_item">
                                <Link to={`/DetailPage/${result.id}`}>
                                    <img className="search_result_image" src={result.image} alt={result.title} />
                                    <div className="search_result_info_box">
                                        <h3 className="search_result_title">{result.title}</h3>
                                        <p className="search_result_price"
                                            style={{ textDecoration: result.salePer ? 'line-through' : 'none' }}>
                                            {result.price ? `${result.price.toLocaleString("ko")}원` :''}
                                            {/* price유무에 따라 노출 여부 결정 */}
                                        </p>
                                        <p className="search_result_discount">
                                            {result.salePer ? `${result.salePer}% 할인` : ''}
                                            {/* salePer유무에 따라 노출 여부 결정 */}
                                        </p>
                                        <p className="search_result_discount_price"
                                            style={{ display: result.salePer ? 'block' : 'none' }}>
                                            {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

                                            {(result.price - (result.price * result.salePer) / 100).toLocaleString("ko")}원
                                            {/* 할인율에 따른 가격변화를 위한 식 */}
                                        </p>
                                        <p>
                                            {result.name ? `${result.name}` : ''}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResultPage;