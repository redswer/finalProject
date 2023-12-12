// import './PaymentPageCoupon.css';
// import PaymentPagePaymentInfo from './paymentPagePaymentInfo/PaymentPagePaymentInfo';
// import { ReactComponent as Icon } from './order_name_icon.svg';
// import PaymentPageModal from './paymentPageModal/PaymentPageModal';
// import { useState } from 'react';

// function PaymentPageCoupon({ location_state }) {

//     const [coupon_put, setCoupon_put] = useState(0);

//     return (
//         <div className="PaymentPageCoupon d-flex">
//             <div className="order_sum_con_L">
//                 <div className="order_sumName_box_L">
//                     <Icon className="order_name_icon" />
//                     <span className="order_name_design">쿠폰/포인트</span>
//                 </div>

//                 <table className="order_sum_tb_L">

//                     <colgroup>
//                         <col className="order_sum_cg_01" />
//                         <col className="order_sum_cg_02" />
//                         <col className="order_sum_cg_03" />
//                     </colgroup>

//                     <tr>
//                         <td>쿠폰</td>
//                         <td>{coupon_put.toLocaleString()}원</td>
//                         <td>
//                             <PaymentPageModal setCoupon_put={setCoupon_put} />
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>포인트 (잔여 : 0p)</td>
//                         <td>0P</td>
//                         <td>
//                             <button className="point_btn" disabled>모두 사용</button>
//                         </td>
//                     </tr>
//                 </table>
//             </div>

//             <PaymentPagePaymentInfo location_state={location_state} coupon_put={coupon_put} />


//         </div>
//     );
// }

// export default PaymentPageCoupon;