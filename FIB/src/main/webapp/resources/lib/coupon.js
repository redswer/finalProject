"use strict"

// 쿠폰 리스트_관리자관점
function couponManagement() {
	let url ="coupon/couponListAdmin";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 => 바보" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 등록 폼 받기
function couponRegister() {
	let url="coupon/couponRegister";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 =>" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰등록 완료
function couponUpload() {
	let formData = new FormData(document.getElementById("myform"));
	
	let url = "coupon/couponRegister";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => { alert("쿠폰등록에 성공했습니다.");
		couponRegister();

	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 수정 폼받기
function couponEditForm(coupon_code) {
	let url ="/coupon/couponEdit?jCode=U&coupon_code=" + coupon_code;
	
	axios.get(
      url
   	  ).then(response => {
   	  let list = response.data;
      document.getElementById('managementArea').innerHTML=list;
	}).catch(err => {
      if(err.response.status=='502') alert(err.response.data);
      else alert("~~ 시스템 오류, 잠시후 다시하세요 => " + err.message);
      document.getElementById('managementArea').innerHTML="";
   	});
   	
    document.getElementById("managementArea").innerHTML=""; 	   
}

// 쿠폰 수정 완료
function couponEditFinish() {
	let formData = new FormData(document.getElementById("couponEditForm"));

	let url = "/coupon/couponEditForm";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => {
			alert("쿠폰을 수정했습니다.");
			couponManagement();
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 삭제
function couponDelete(coupon_code) {
	let url="/coupon/couponDelete/" + coupon_code;
	axios.delete(url).then(response => {
		alert("삭제 성공했습니다.");
		couponManagement();
	}).catch(err => {
		alert("삭제 실패 => " + err.message);
	});
}



