<%-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="/resources/lib/coupon.js"></script>
<script src="/resources/lib/board.js"></script>
<title>Home</title>
</head>
<body>
	<div class="list">
		<div class="user_admin">회원 관리</div>
		<div class="product_admin">제품 관리</div>
		<div class="board_admin">
			게시판 관리
			<div class="textlink" onclick="notice()">공지사항</div>
			<div class="textlink" onclick="faq()">FAQ</div>
			<div class="textlink" onclick="inquiry()">1:1 문의</div>
		</div>
		<div class="event_admin">이벤트 관리</div>
		<div class="coupon_admin" onclick="couponList_Admin()">쿠폰 관리</div>
	</div>
	<div class="content" id="resultArea1">
		<h3>관리자 페이지 입니다.</h3>
	</div>
</body>
</html>
 --%>
 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="/resources/lib/coupon.js"></script>
	<script src="/resources/lib/board.js"></script>
	<script src="/resources/lib/memberPayment.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="adminListArea">
                <div>
                    <div class="adminList">
                        <div class="adminListHeader">
                            관리목록
                        </div>
                       	<ul class="listGroup">
                           <li class="listGroupItem" onclick="userManagement()">회원</li>
                           <li class="listGroupItem" onclick="productManagement()">제품</li>
                           <li class="listGroupItem" onclick="memberPaymentList('all')">주문내역</li>
                           <li class="listGroupItem" onclick="noticeManagement()">공지사항</li>
                           <li class="listGroupItem" onclick="fAQManagement()">FAQ</li>
                           <li class="listGroupItem" onclick="inquiryManagement()">1:1 문의</li>
                           <li class="listGroupItem" onclick="eventManagement()">이벤트</li>
                           <li class="listGroupItem" onclick="couponManagement()">쿠폰</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="resultArea">
                <div>
                    <div id="managementArea" />
                </div>
            </div>
        </div>
    </div>
</body>
</html>