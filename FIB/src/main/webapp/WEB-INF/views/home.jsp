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
                           <li class="listGroupItem" onclick="faqManagement()">FAQ</li>
                           <li class="listGroupItem" onclick="inquiryManagement()">1:1 문의</li>
                           <li class="listGroupItem" onclick="eventManagement()">이벤트</li>
                           <li class="listGroupItem" onclick="couponManagement()">쿠폰</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="resultArea">
				<div id="managementArea">
					<h2>관리자 페이지입니다</h2>
				</div>
            </div>
        </div>
    </div>
</body>
</html>