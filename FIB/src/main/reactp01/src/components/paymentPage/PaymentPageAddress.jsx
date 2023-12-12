import { useState } from 'react';
import './PaymentPageAddress.css';
import { ReactComponent as Icon } from './order_name_icon.svg';

function PaymentPageAddress() {

    return (
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
                                <input className="order_addr_userName ip_hi" type="text" id="order_addr_ipLabel_01" />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan="3"><span className="order_addr_con_req">* </span>
                                <label for="order_addr_ipLabel_02">주소</label>
                            </th>
                            <td>
                                <input className="order_addr_01 ip_hi" type="text" id="order_addr_ipLabel_02"
                                    placeholder="우편번호" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="order_addr_02 ip_hi" type="text" placeholder="주소" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="order_addr_03 ip_hi" type="text" placeholder="상세주소" />
                            </td>
                        </tr>
                        <tr>
                            <th><span className="order_addr_con_req">* </span>
                                <label for="order_addr_ipLabel_03">휴대폰번호</label>
                            </th>
                            <td>
                                <select className="order_callNumber ip_hi" id="order_addr_ipLabel_03">
                                    <option value="선택">선택</option>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                </select> &ndash;&nbsp;
                                <input className="order_callNumber ip_hi" type="text" /> &ndash;&nbsp;
                                <input className="order_callNumber ip_hi" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <th><label for="order_addr_ipLabel_04">전화번호</label></th>
                            <td>
                                <select className="order_callNumber ip_hi" id="order_addr_ipLabel_04">
                                    <option value="선택">선택</option>
                                    <option value="02">02</option>
                                    <option value="031">031</option>
                                    <option value="032">032</option>
                                </select> &ndash;&nbsp;
                                <input className="order_callNumber ip_hi" type="text" /> &ndash;&nbsp;
                                <input className="order_callNumber ip_hi" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <th><label for="order_addr_ipLabel_05">배송요청사항</label></th>
                            <td>
                                <input className="requestList ip_hi" id="order_addr_ipLabel_05" list="requestList"
                                    placeholder="직접입력" />
                                <datalist id="requestList">
                                    <option value="부재시 경비실에 맡겨주세요."></option>
                                    <option value="집앞에 놔주세요."></option>
                                    <option value="부재시 전화주세요."></option>
                                </datalist>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default PaymentPageAddress;