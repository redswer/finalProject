import { Link, Route, Routes } from 'react-router-dom';
import './PaymentPagePaymentType.css';
import { ReactComponent as Icon } from './order_name_icon.svg';

function PaymentPagePaymentType() {
    return (
        <div className="PaymentPagePaymentType">
            <div className="payment_type_name_box d-flex">
                <span>
                    <Icon className="order_name_icon" />
                    <span className="order_name_design">결제방법</span>
                </span>
                <span className="payment_btn_box">
                    <Link to='/Payment_server' className="payment_btn">결제하기</Link>
                </span>
            </div>

            <hr className="payment_line_01" />

            <div className="payment_type_sel d-flex">
                <input className="payment_simple_ip payment_radio" type="radio" name="payment_type" id="payment_simple" />
                <label className="payment_radio_box" for="payment_simple">간편결제</label>

                <input className="payment_card_ip payment_radio" type="radio" name="payment_type" id="payment_card" />
                <label className="payment_radio_box" for="payment_card">카드결제</label>

                <input className="payment_cash_ip payment_radio" type="radio" name="payment_type" id="payment_cash" />
                <label className="payment_radio_box" for="payment_cash">무통장입금</label>

                <input className="payment_radio" type="radio" name="payment_type" id="payment_phone" />
                <label className="payment_radio_box" for="payment_phone">휴대폰결제</label>

                <div className="payment_simple_box">
                    <div className="payment_simple_box_01">
                        <input className="payment_simplePay_ip" type="radio" id="payment_naverpay" name="payment_pay" />
                        <label for="payment_naverpay">
                            <img className="payment_simplePay_img" src={"/img/payment_naverpay.png"} alt="네이버페이" />
                            <span>&nbsp;&nbsp;네이버페이</span>
                        </label>
                    </div>
                    <div className="payment_simple_box_01">
                        <input className="payment_simplePay_ip" type="radio" id="payment_kakaopay" name="payment_pay" />
                        <label for="payment_kakaopay">
                            <img className="payment_simplePay_img" src={"/img/payment_kakaopay.gif"} alt="카카오페이" />
                            <span>&nbsp;&nbsp;카카오페이</span>
                        </label>
                    </div>
                </div>

                <div className="payment_card_box">
                    <div className="payment_simple_box_01">
                        <input className="payment_simplePay_ip" type="radio" id="payment_kbpay" name="payment_pay" />
                        <label for="payment_kbpay">
                            <img className="payment_cardPay_img" src={"./img/payment_kb.png"} alt="국민카드" />
                            <span>&nbsp;&nbsp;국민카드</span>
                        </label>
                    </div>
                    <div className="payment_simple_box_01">
                        <input className="payment_simplePay_ip" type="radio" id="payment_shinhanpay" name="payment_pay" />
                        <label for="payment_shinhanpay">
                            <img className="payment_cardPay_img" src={"./img/payment_shinhan.png"} alt="신한카드" />
                            <span>&nbsp;&nbsp;신한카드</span>
                        </label>
                    </div>
                    <div className="payment_simple_box_01">
                        <input className="payment_simplePay_ip" type="radio" id="payment_woorpay" name="payment_pay" />
                        <label for="payment_woorpay">
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
    );
}

export default PaymentPagePaymentType;