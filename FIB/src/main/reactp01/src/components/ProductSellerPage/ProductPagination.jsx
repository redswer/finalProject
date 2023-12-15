import React from 'react';

const ProductPagination = ({ totalPages, currentPage, onPageChange, onSizeChange, pageSizeOptions, visiblePageCount }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((page) => page + 1);

  // 페이지 리스트의 시작과 끝을 계산합니다.
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="pagination">
      <span>
        현재 {currentPage} 페이지 / 총 {totalPages} 페이지
      </span>

      <button onClick={() => onPageChange(1)}>처음</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>

      {visiblePages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={currentPage === page ? 'active' : ''}>
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>

      <button onClick={() => onPageChange(totalPages)}>끝</button>

      {/* 페이지 사이즈를 변경하는 셀렉트 박스 */}
      <select onChange={(e) => onSizeChange(Number(e.target.value))} value={visiblePageCount}>
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}개씩 보기
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductPagination;