import './CartCautionBox.css';

function CartCautionBox() {
    return (
        <>
            <div className="basket_cautionbox">
                <div className="basket_cautionbox-title">주문/배송 유의사항</div>
                <div className="basket_cau-detail"> ● 택배 배송일정은 기본배송지 기준으로 예상일이 노출됩니다.</div>
                <div className="basket_cau-detail"> ● 상품별 배송일정이 서로 다를시 가장 늦은 일정의 상품 기준으로 모두 함께 배송됩니다.</div>
                <div className="basket_cau-detail"> ● 배송지 수정시 예상일이 변경 될 수 있으며, 주문서에서 배송일정을 꼭 확인하시기 바랍니다.</div>
                <div className="basket_cau-detail"> ● 바로드림의 수령가능일은 나의 기본매장 기준으로 노출됩니다.</div>
                <div className="basket_cau-detail"> ● 쿠폰, 통합포인트, 교환권 사용시 적립예정포인트가 변동 될 수 있습니다.</div>
            </div>

            {/* <div className="advertise-img">
                <a href="https://www.yes24.com/eWorld/EventWorld/Event?eventno=203942&eventCode=YES70">
                    <img src="./img_book_categori/advertise_basket.png" alt=""></a>
            </div>

            <div className="paymentbenefitbox">
                <div className="benefit-name">결제/할인 혜택</div>
                <div className="benefit-list">
                    <div className="benefit-yes24">
                        <div className="benefit-img"><img src="./img_book_categori/yes24_hyundai-card.png"
                            alt=""></a>
                        </div>
                        <a className="benefit-link" href="#">
                            <div>예스24 현대카드</div>
                            <div>10,000원 캐시백</div>
                            <div>(YES포인트 최대 3% 추가적립)</div>
                        </a>
                    </div>

                    <div className="benefit-kbpay">
                        <div className="benefit-img"><img src="./img_book_categori/kbpay.jpg" alt=""></a>
                        </div>
                        <a className="benefit-link" href="#">
                            <div>KB페이</div>
                            <div>1000원 즉시할인</div>
                            <div> (1만 5천원 이상 결제시, 일 1000명)</div>
                        </a>
                    </div>

                    <div className="benefit-tosspay">
                        <div className="benefit-img"><img src="./img_book_categori/tosspay.jpg" alt=""></a>
                        </div>
                        <a className="benefit-link" href="#">
                            <div>토스페이</div>
                            <div>첫결제 3천원</div>
                            <div>(생애첫결제시, 1만원 이상)</div>
                        </a>
                    </div>

                    <div className="benefit-mobilepop">
                        <div className="benefit-img"><img src="./img_book_categori/mobilepop.jpg"
                            alt=""></a>
                        </div>
                        <a className="benefit-link" href="#">
                            <div>모바일팝</div>
                            <div>모바일 4% 즉시할인</div>
                            <div>(모바일 결제시)</div>
                        </a>
                    </div>

                </div>
            </div> */}

            {/* <div className="final-paymentbox">
                <a className="final-shopping" href="../index.html">쇼핑 계속하기</a>
                <a className="final-modification" href="#">구매 목록 수정하기</a>
                <a className="final-order" href="../payment/payment_orient.html">주문하기</a>
            </div> */}



        </>
    );
}

export default CartCautionBox;