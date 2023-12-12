<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="/Spring02/resources/lib/couponCheck.js"></script>
<script>

function idOK(){

	opener.document.getElementById('title').value='${param.title}';
	
	opener.document.getElementById('idDup').disabled='disabled';
	opener.document.getElementById('submitTag').disabled='';

	opener.document.getElementById('id').readOnly=true; 
	opener.document.getElementById('password').focus();
	
	close();
	
}

</script>
<title>** 쿠폰 이름 중복 확인 **</title>
</head>
<body>
<div id="wrap">
	<h3> 쿠폰 이름 중복 확인</h3>
	<h4>Parameter id값 확인</h4>
	=> Parameter_Title : ${param.id}<br>
	=> Coupon_Title : ${coupon.title}<br>
	<hr>
	<form action="titleDupCheck" method="get">
		User_ID :
		<input type="text" name="id" id="id" value="${param.id}">
		<input type="submit" value="title중복확인" onclick="return titleDupCheck()">
		<br>
		<!-- inCheck.js의 idCheck()의 결과에 따라 submit 결정 -->
		<span id="iMessage" class="eMessage"></span>	
	</form>
	<br><br>
	<!-- 서버의 처리결과 : idUse의 값 'Y' / 'N' 값 -->
	<div id="msgBlock">
		<c:if test="${idUse=='Y'}">
			${memberDTO.id}은/는 사용 가능합니다. &nbsp;&nbsp;
			<button onclick="idOK()">ID_선택</button>
		</c:if>
		<c:if test="${idUse=='N'}">
			${memberDTO.id}은/는 이미 사용중입니다. &nbsp;&nbsp;
			다시 입력해주세요
			<!-- 부모창(mJoinForm, opener)에 남아있는 사용자가 입력한 id는 지워주고,  
				 현재(this)창 에서는 id 에 focus 를 주고 재입력 유도 -> script 필요
			-->
			<script>
				document.getElementById('id').focus();
				opener.document.getElementById('id').value='';
			</script>
		</c:if>
	</div>
</div>
	
</body>
</html>