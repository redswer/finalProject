import './PaymentPage.css';
import './PaymentPageOrderProduct.css';
import './PaymentPageAddress.css';
import './PaymentPageCoupon.css';
import './paymentPagePaymentInfo/PaymentPagePaymentInfo.css';
import './PaymentPagePaymentType.css';
import PaymentPageOrderProductAdd from './PaymentPageOrderProductAdd/PaymentPageOrderProductAdd';
import PaymentPageModal from './paymentPageModal/PaymentPageModal';
import SideButton from '../SideButton';
import { ReactComponent as Icon } from './order_name_icon.svg';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentPage() {

    const location = useLocation();
    const { product_code, cart_code } = location.state.order_data[0];

    // 로그인 아이디
    const loginID = sessionStorage.getItem("loginID");

    // 총 상품금액
    const total_sum = location.state.order_data.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.proamount);
    }, 0);

    // 쿠폰
    const [coupon_put, setCoupon_put] = useState(0);

    //배송비
    const [delivery_price, setDelivery_price] = useState(3500);

    useEffect(() => {
        if (total_sum >= 20000) {
            setDelivery_price(0);
        }
    }, []);

    // 현재 날짜 생성
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = parseInt(('0' + date.getDate()).slice(-2));

    const today = `${year}-${month}-${day}`;

    // 배송예정일
    const [arrive_date, setArrive_date] = useState('');

    useEffect(() => {
        const arrive_date_day = parseInt(Math.random() * (6 - 3) + 3);
        setArrive_date(`${year}-${month}-${day + arrive_date_day}`);
    }, [location]);

    // 적립 포인트
    const [point, setPoint] = useState(0);

    useEffect(() => {
        setPoint(total_sum * 0.05);
    }, [total_sum]);

    // 결제하기 버튼
    const payment_button = () => {
        const payment_formData = new FormData(document.getElementById('paymentPage_form'));
        console.log(payment_formData);
        payment_formData.append('paymentDetailData', JSON.stringify(location.state.order_data));

        axios.post(
            `/restmemberpayment/memberpaymentinsert`,
            payment_formData,
            {
                headers: { 'content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(response.data);
            window.location.href = `/OrderListPage`;
        }).catch((err) => {
            console.log(err.response.data);
            console.log(err.message);
        });
    }

    return (
        <div className='PaymentPage'>
            <form id="paymentPage_form" method="post">

                {/* 회원아이디 */}
                <input type="hidden" name="id" value={loginID} />
                {/* 주문날짜 */}
                <input type="hidden" name="payment_date" value={today} />
                {/* 주문상품 가짓수 */}
                <input type="hidden" name="product_amount" value={location.state.order_data.length} />
                {/* 배송상태 */}
                <input type="hidden" name="delivery_state" value="상품 준비 중" />
                {/* 배송예정일 */}
                <input type="hidden" name="arrive_date" value={arrive_date} />

                {/* 적립 포인트 */}
                <input type="hidden" name="point" value={point} />

                <div className="PaymentPageOrderProduct">
                    <div className="order_name_box">
                        <Icon className="order_name_icon" />
                        <span className="order_name_design">주문 상품</span>
                    </div>

                    <div className="order_list_box">

                        <table className="order_list_tb">

                            <colgroup>
                                <col className="order_list_cg_01" />
                                <col className="order_list_cg_02" />
                                <col className="order_list_cg_03" />
                                <col className="order_list_cg_04" />
                                <col className="order_list_cg_05" />
                            </colgroup>

                            <thead>
                                <tr>
                                    <th colSpan="2">상품명</th>
                                    <th>판매가</th>
                                    <th>수량</th>
                                    <th>합계</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    location.state.order_data.map((it, index) =>
                                        (<PaymentPageOrderProductAdd key={index} {...it} />))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>

                <div className="PaymentPageAddress">
                    <div className="order_addr_name_box">
                        <Icon className="order_name_icon" />
                        <span className="order_name_design">배송지 정보</span>
                        <span className="order_addr_ip_box">
                            <label>
                                <input type="checkbox" />&nbsp;기본 배송정보와 동일
                            </label>
                        </span>
                    </div>

                    <div className="order_addr_con_box">

                        <table className="order_addr_con_tb">

                            <colgroup>
                                <col className="order_addr_cg_01" />
                                <col className="order_addr_cg_02" />
                            </colgroup>
                            <tbody>

                                <tr>
                                    <th>
                                        <span className="order_addr_con_req">* </span>
                                        <label for="order_addr_ipLabel_01">이름</label>
                                    </th>
                                    <td>
                                        <input type="text" name="recipient" className="order_addr_userName ip_hi" id="order_addr_ipLabel_01" />
                                    </td>
                                </tr>
                                <tr>
                                    <th rowSpan="3"><span className="order_addr_con_req">* </span>
                                        <label for="order_addr_ipLabel_02">주소</label>
                                    </th>
                                    <td>
                                        <input type="text" name="address_zip" className="order_addr_01 ip_hi" id="order_addr_ipLabel_02"
                                            placeholder="우편번호" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="address" className="order_addr_02 ip_hi" placeholder="주소" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="address_detail" className="order_addr_03 ip_hi" placeholder="상세주소" />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span className="order_addr_con_req">* </span>
                                        <label for="order_addr_ipLabel_03">휴대폰번호</label>
                                    </th>
                                    <td>
                                        <input type="text" name="recipient_phone_number" className="order_callNumber ip_hi" id="order_addr_ipLabel_03" placeholder="'-' 제외하고 입력" />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label for="order_addr_ipLabel_04">배송요청사항</label></th>
                                    <td>
                                        <input list="requestList" className="requestList ip_hi" id="order_addr_ipLabel_04"
                                            placeholder="직접입력" />
                                        <datalist id="requestList">
                                            <option value="부재시 경비실에 맡겨주세요."></option>
                                            <option value="부재시 전화주세요."></option>
                                            <option value="집앞에 놔주세요."></option>
                                        </datalist>
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                    </div>
                </div>

                <div className="PaymentPageCoupon d-flex">
                    <div className="order_sum_con_L">
                        <div className="order_sumName_box_L">
                            <Icon className="order_name_icon" />
                            <span className="order_name_design">쿠폰/포인트</span>
                        </div>

                        <table className="order_sum_tb_L">

                            <colgroup>
                                <col className="order_sum_cg_01" />
                                <col className="order_sum_cg_02" />
                                <col className="order_sum_cg_03" />
                            </colgroup>

                            <tr>
                                <td>쿠폰</td>
                                <td>{coupon_put.toLocaleString()}원</td>
                                <td>
                                    <PaymentPageModal setCoupon_put={setCoupon_put} />
                                </td>
                            </tr>
                            <tr>
                                <td>포인트 (잔여 : 0p)</td>
                                <td>0P</td>
                                <td>
                                    <button className="point_btn" disabled>모두 사용</button>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="order_sum_con_R">
                        <div className="order_sumName_box_R d-flex">
                            <span>
                                <Icon className="order_name_icon" />
                                <span className="order_name_design"> 결제금액</span>
                            </span>
                            <span className="order_sum order_name_design">
                                <input type="hidden" name="final_price" value={total_sum - coupon_put + delivery_price} />
                                {(total_sum - coupon_put + delivery_price).toLocaleString()}원
                            </span>
                        </div>

                        <table className="order_sum_tb_R">
                            <tr>
                                <td>총 상품금액</td>
                                <td>
                                    <input type="hidden" name="origin_price" value={total_sum} />
                                    {total_sum.toLocaleString()} 원
                                </td>
                            </tr>
                            <tr>
                                <td>쿠폰/포인트 할인</td>
                                <td>{coupon_put.toLocaleString()}원</td>
                            </tr>
                            <tr>
                                <td>배송료</td>
                                <td>{delivery_price.toLocaleString()}원</td>
                            </tr>
                        </table>
                    </div>

                </div>

                <div className="PaymentPagePaymentType">
                    <div className="payment_type_name_box d-flex">
                        <span>
                            <Icon className="order_name_icon" />
                            <span className="order_name_design">결제방법</span>
                        </span>
                        <span className="payment_btn_box">
                            <button type="button" className="payment_btn" onClick={payment_button}>결제하기</button>
                        </span>
                    </div>

                    <hr className="payment_line_01" />

                    <div className="payment_type_sel d-flex">
                        <input type="radio" name="payment_option" value="simple" className="payment_simple_ip payment_radio" id="payment_simple" />
                        <label for="payment_simple" className="payment_radio_box">간편결제</label>

                        <input type="radio" name="payment_option" value="card" className="payment_card_ip payment_radio" id="payment_card" />
                        <label for="payment_card" className="payment_radio_box">카드결제</label>

                        <input type="radio" name="payment_option" value="cash" className="payment_cash_ip payment_radio" id="payment_cash" />
                        <label for="payment_cash" className="payment_radio_box">무통장입금</label>

                        <input type="radio" name="payment_option" value="phone" className="payment_radio" id="payment_phone" />
                        <label for="payment_phone" className="payment_radio_box">휴대폰결제</label>

                        <div className="payment_simple_box">
                            <div className="payment_simple_box_01">
                                <input type="radio" name="payment_option_detail" value="naverpay" className="payment_simplePay_ip" id="payment_naverpay" />
                                <label for="payment_naverpay">
                                    <img className="payment_simplePay_img" src={"/img/payment_naverpay.png"} alt="네이버페이" />
                                    <span>&nbsp;&nbsp;네이버페이</span>
                                </label>
                            </div>
                            <div className="payment_simple_box_01">
                                <input type="radio" name="payment_option_detail" value="kakaopay" className="payment_simplePay_ip" id="payment_kakaopay" />
                                <label for="payment_kakaopay">
                                    <img className="payment_simplePay_img" src={"/img/payment_kakaopay.gif"} alt="카카오페이" />
                                    <span>&nbsp;&nbsp;카카오페이</span>
                                </label>
                            </div>
                        </div>

                        <div className="payment_card_box">
                            <div className="payment_simple_box_01">
                                <input type="radio" name="payment_option_detail" value="kbcard" className="payment_simplePay_ip" id="payment_kbcard" />
                                <label for="payment_kbcard">
                                    <img className="payment_cardPay_img" src={"./img/payment_kb.png"} alt="국민카드" />
                                    <span>&nbsp;&nbsp;국민카드</span>
                                </label>
                            </div>
                            <div className="payment_simple_box_01">
                                <input type="radio" name="payment_option_detail" value="shinhancard" className="payment_simplePay_ip" id="payment_shinhancard" />
                                <label for="payment_shinhancard">
                                    <img className="payment_cardPay_img" src={"./img/payment_shinhan.png"} alt="신한카드" />
                                    <span>&nbsp;&nbsp;신한카드</span>
                                </label>
                            </div>
                            <div className="payment_simple_box_01">
                                <input type="radio" name="payment_option_detail" value="wooricard" className="payment_simplePay_ip" id="payment_wooricard" />
                                <label for="payment_wooricard">
                                    <img className="payment_cardPay_img" src={"./img/payment_woori.png"} alt="우리카드" />
                                    <span>&nbsp;&nbsp;우리카드</span>
                                </label>
                            </div>
                        </div>

                        <div className="payment_acconut_box">
                            <div className="payment_acconut_box_01">
                                ※ 무통장 입금 시 주문자명으로 입금해 주셔야 입금확인이 가능합니다.
                            </div>
                            <div className="payment_simple_box_01">
                                <table className="payment_acconut_tb">
                                    <tr>
                                        <th>은행명</th>
                                        <td>국민은행</td>
                                    </tr>
                                    <tr>
                                        <th>계좌번호</th>
                                        <td>846202-000-00-000</td>
                                    </tr>
                                    <tr>
                                        <th>예금주명</th>
                                        <td>(주)여우</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <SideButton />
        </div>
    );
}

export default PaymentPage;