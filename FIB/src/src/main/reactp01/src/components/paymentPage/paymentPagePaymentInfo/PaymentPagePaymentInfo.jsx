// import { useState } from 'react';
// import './PaymentPagePaymentInfo.css';
// import { ReactComponent as Icon } from './order_name_icon.svg';

// function PaymentPagePaymentInfo({ location_state, coupon_put }) {

//     const { price } = location_state.oneProductWriterJoin;
//     let selected_quantity = location_state.selected_quantity;

//     // 배송비
//     const [delivery_price, setDelivery_price] = useState(3500);

//     if (price >= 20000) {
//         setDelivery_price(0);
//     }

//     return (
//         <div className="order_sum_con_R">
//             <div className="order_sumName_box_R d-flex">
//                 <span>
//                     <Icon className="order_name_icon" />
//                     <span className="order_name_design">총 결제금액</span>
//                 </span>
//                 <span className="order_sum order_name_design">{((price * selected_quantity) - coupon_put + delivery_price).toLocaleString()}원</span>
//             </div>

//             <table className="order_sum_tb_R">
//                 <tr>
//                     <td>총 상품금액</td>
//                     <td>{(price * selected_quantity).toLocaleString()}원</td>
//                 </tr>
//                 <tr>
//                     <td>쿠폰/포인트 할인</td>
//                     <td>{coupon_put.toLocaleString()}원</td>
//                 </tr>
//                 <tr>
//                     <td>배송료</td>
//                     <td>{delivery_price.toLocaleString()}원</td>
//                 </tr>
//             </table>
//         </div>
//     );
// }

// export default PaymentPagePaymentInfo;