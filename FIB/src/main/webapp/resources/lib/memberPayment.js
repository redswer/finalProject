"use strict"

// 주문정보 조회
function memberPaymentList() {

	axios.get("memberPayment/memberPaymentList"
	).then(response => {
		document.getElementById('managementArea').innerHTML = response.data;
	}).catch(err => {
		alert("주문내역 조회 실패 => " + err.message);
		document.getElementById('managementArea').innerHTML = '실패 ㅠㅠㅠ';
	});

}

// 주문정보 취소
function paymentCancel(member_payment_code) {

	if (confirm('주문내역을 취소하시겠습니까?')) {

		axios.post(
			"memberPayment/memberPaymentCancel",
			member_payment_code,
			{
				headers: { 'content-Type': 'application/json' }
			}
		).then(response => {
			new memberPaymentList();
		}).catch(err => {
			alert("주문내역 취소 실패 => " + err.message);
		});
		
	}

}