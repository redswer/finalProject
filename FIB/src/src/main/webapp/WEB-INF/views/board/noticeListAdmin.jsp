<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/board.js"></script>
<title>공지사항 관리</title>
</head>
<body>
	<h2>공지사항 관리</h2>
	<div class="notice_register_search">
		<span class="notice_register" onclick="noticeRegister()"> 등록하기</span>
		<div class="notice_search">
			<select class="notice_category" name="category" id="category" onchange="noticeSortSelectOptions(this.value)">
				<option value="전체">전체</option>
				<option value="일반">일반</option>
				<option value="주문/결제">주문/결제</option>
				<option value="제품">제품</option>
				<option value="이벤트">이벤트</option>
				<option value="쿠폰">쿠폰</option>
			</select> 
			<input type="text"></input>
			<button>검색</button>
		</div>
	</div>
	<br>
	<table class="noticeTable" id="noticeTable" border="1">
		<tr bgcolor="Lime">
			<th style="width: 3%;">CODE</th>
			<th style="width: 5%;">분류</th>
			<th style="width: 25%;">제목</th>
			<th style="width: 25%;">내용</th>
			<th style="width: 10%;">이미지</th>
			<th style="width: 7%;">등록일</th>
			<th style="width: 6%;">조회수</th>
			<th style="width: 7%;">수정일</th>
			<th colspan="2" style="width: 10%;">관리하기</th>
		</tr>
		<c:if test="${!empty requestScope.noticeList}">
			<c:forEach var="s" items="${requestScope.noticeList}">
				<tr style="text-align: center">
					<td>${s.notice_code}</td>
					<td>${s.category}</td>
					<td>${s.title}</td>
					<td>${s.content}</td>
					<td><img alt="${s.title}" src="${s.image}" width="120"
						height="50"></td>
					<td>${s.regdate}</td>
					<td>${s.view}</td>
					<td>${s.moddate}</td>
					<td class="textlink" onclick="noticeEditForm('${s.notice_code}')">수정</td>
					<td class="textlink" onclick="noticeDelete('${s.notice_code}')">삭제</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.noticeList}">
			<tr>
				<td colspan="7">출력할 데이터 없음</td>
			</tr>
		</c:if>
	</table>
</body>
</html>