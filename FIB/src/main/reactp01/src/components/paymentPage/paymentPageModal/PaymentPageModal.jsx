import './PaymentPageModal.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

const PaymentPageModal = ({ setCoupon_put }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            width: '600px',
            padding: '45px 0',
            border: 'solid 1px lightgrey',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const coupon_selected = (e) => {
        setCoupon_put(parseInt(e.target.value));
    }

    // ========================================================================
    // 쿠폰 데이터 가져오기
    // 전체 쿠폰


    // 회원별 쿠폰


    return (
        <div>
            <button type="button" className="coupon_btn" onClick={openModal}>쿠폰 선택</button>

            <Modal
                style={modalStyles}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="모달"
            >
                <div className="payment_modal_box">
                    <div className="payment_modal_title d-flex">
                        <span className="payment_modal_title_coupon">쿠폰 내역</span>
                        <span>
                            <button className="payment_modal_title_btn" onClick={closeModal}>선택완료</button>
                        </span>
                    </div>

                    <hr className="payment_modal_line" />

                    <div className="payment_modal_list">
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_01" value="5000" />
                                <label htmlFor="coupon_input_label_01">신규 회원가입 환영 쿠폰</label>
                            </span>
                            <span>5,000원</span>
                        </div>
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_02" value="1000" />
                                <label htmlFor="coupon_input_label_02">생일 축하 쿠폰</label>
                            </span>
                            <span>1,000원</span>
                        </div>
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_03" value="1500" />
                                <label htmlFor="coupon_input_label_03">가을맞이 이벤트 쿠폰</label>
                            </span>
                            <span>1,500원</span>
                        </div>
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_04" value="1000" />
                                <label htmlFor="coupon_input_label_04">여름휴가는 책과 함께</label>
                            </span>
                            <span>1,000원</span>
                        </div>
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_05" value="3000" />
                                <label htmlFor="coupon_input_label_05">이달의 독서왕</label>
                            </span>
                            <span>3,000원</span>
                        </div>
                        <div className="d-flex">
                            <span>
                                <input className='coupon_select' onClick={coupon_selected} type="radio" name="payment_coupon" id="coupon_input_label_06" value="0" />
                                <label htmlFor="coupon_input_label_06">쿠폰 적용 안함</label>
                            </span>
                            <span>0원</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PaymentPageModal;