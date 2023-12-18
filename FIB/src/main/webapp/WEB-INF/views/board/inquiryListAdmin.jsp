<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/board.js"></script>
<title>1:1문의 관리</title>
</head>
<body>
    <h2>1:1문의 관리</h2>
    <div class="inquiry_register_search">
		<div class="inquiry_search">
			<input type="checkbox" class="inquiry_answer_toggle" id="inquiry_answer_toggle" onclick="toggleAnswerSort()">답변여부</button>
			<select class="inquiry_category" name="category" id="category" onchange="inquirySortSelectOptions()"> 
				<c:forEach var="category" items="${fn:split('전체,일반,제품,주문/결제,반품/환불/취소,이벤트/쿠폰', ',')}">
               		<option value="${category}" ${param.category == category ? "selected" : ""}>${category}</option>
           		</c:forEach>
<!-- 			<option value="전체">전체</option>
				<option value="일반">일반</option>
				<option value="제품">제품</option>
				<option value="주문/결제">주문/결제</option>
				<option value="반품/환불/취소">반품/환불/취소</option>
				<option value="이벤트/쿠폰">이벤트/쿠폰</option> -->
			</select>
		</div>
	</div>
	<div class="underline"></div>
	<table class="inquiryTable" id="inquiryTable" border="1">
		<tr>		
			<th style="width: 2%;">CODE</th>
			<th style="width: 8%;">아이디</th>
			<th style="width: 7%;">분류</th>
			<th style="width: 20%;">제목</th>
			<th style="width: 20%;">내용</th>
			<th style="width: 5%;">첨부자료</th>
			<th style="width: 10%;">등록일</th>
			<th style="width: 5%;">답변여부</th>
			<th style="width: 10%;">답변일자</th>
			<th style="width: 5%;">관리하기</th>
		</tr>
		<c:if test="${!empty requestScope.inquiryList}">
			<c:forEach var="s" items="${requestScope.inquiryList}">
				<tr style="text-align:center">
					<td>${s.inquiry_code}</td>
					<td>${s.id}</td>
					<td>${s.category}</td>
					<td>${s.title}</td>
					<td>${s.content}</td>
					<td>${s.attached_data}</td>
					<td>${s.regdate}</td>
					<td>${s.answer_check ? "O" : "x"}</td>
					<td>${s.answer_regdate}</td>				
					<td class="textlink" onclick="inquiryAnswerForm('${s.inquiry_code}')">
						<c:choose>
							<c:when test="${s.answer_check eq true}">
			                    수정
			                </c:when>
			                <c:otherwise>
			                    답변
			                </c:otherwise>
			            </c:choose>
					</td>										
				</tr>
			</c:forEach>
		</c:if>
	 	<c:if test="${empty requestScope.inquiryList}">
	 		<tr>
	 			<td colspan="7">출력할 데이터 없음</td>
	 		</tr>
	 	</c:if>
	</table>
	<div class="pagination_wrap">
	    <c:if test="${not empty requestScope.itemPage}">
	        <c:forEach var="pageNumber" begin="0" end="${requestScope.totalPages - 1}">
	     	<span onclick="inquiryManagementPage(${pageNumber})"
	                class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
	              ${pageNumber + 1}
	     	</span>
	        </c:forEach>
	    </c:if>
	</div>
</body>
</html>