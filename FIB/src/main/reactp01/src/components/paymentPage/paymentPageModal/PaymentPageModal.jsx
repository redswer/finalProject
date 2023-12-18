import './PaymentPageModal.css';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPageModal = ({ setCoupon_selected }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            width: '35%',
            padding: '45px 0',
            border: 'solid 1px rgb(176, 176, 176)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    // ========================================================================
    // 쿠폰 조회
    const [couponList, setCouponList] = useState('');
    const [userCuponList, setUserCuponList] = useState('');

    useEffect(() => {
        axios.get(`/restcoupon/couponList`)
            .then((response) => {
                setCouponList(response.data);
                console.log('쿠폰 내역 조회 성공');
            }).catch((err) => {
                console.log(`쿠폰 내역 조회 실패 : ${err.message}`);
            });

        axios.get(`/restuserCoupon/userCouponList`)
            .then((response) => {
                setUserCuponList(response.data);
                console.log('회원쿠폰 내역 조회 성공');
            }).catch((err) => {
                console.log(`회원쿠폰 내역 조회 실패 : ${err.message}`);
            });
    }, []);

    const [couponArray, setCouponArray] = useState([]);

    useEffect(() => {
        const array = [];

        for (const userCouponOne of userCuponList) {
            for (const couponOne of couponList) {
                if (userCouponOne.coupon_code === couponOne.coupon_code) {
                    array.push(couponOne);
                }
            }
        }

        setCouponArray(array);

    }, [couponList, userCuponList]);

    // =================================================================
    // 선택한 쿠폰 데이터
    const coupon_put = (coupon_code, coupon_title, discount_rate, max) => {
        setCoupon_selected((prevState) => ({
            ...prevState,
            coupon_code: coupon_code,
            coupon_title: coupon_title,
            discount_rate: discount_rate,
            max: max
        }));
    };

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

                    <div className="payment_modal_list d-flex">
                        {
                            couponArray.map(index => (
                                <div key={ImageBitmapRenderingContext} className='modal_coupon_map'>
                                    <input
                                        type="radio"
                                        name="payment_coupon"
                                        value={index.discount_rate == 0 ? index.max : index.discount_rate}
                                        className='modal_coupon_input'
                                        id={`coupon_input_label_${index.coupon_code}`}
                                        onClick={() => coupon_put(index.coupon_code, index.title, index.discount_rate, index.max)}
                                    />
                                    <label id="modal_coupon_label" htmlFor={`coupon_input_label_${index.coupon_code}`}>

                                        <img src={`../img/${index.image}`} />
                                        <div className="modal_coupon_content">
                                            <div className="modal_coupon_title">{index.title}</div>
                                            <div className="modal_coupon_date">~ {index.end} 까지</div>
                                        </div>

                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PaymentPageModal;