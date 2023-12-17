import './OrderListPage.css';
import OrderListDateSelect from './OrderListDateSelect';
import OrderListDelProCau from './OrderListDelProCau';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function OrderListPage() {

    const loginID = sessionStorage.getItem("loginID");
    const [detailData , setDetailData] = useState([]);



    // useEffect(()=> {
    //     axios
    //         .get(`/memberdetailpayment/mpdList?id=${loginID}`)
    //         .then((res)=> {
    //             setDetailData(res.data);
    //             console.log(`주문상세 성공 : `, res.data);
    //             alert(`주문상세 성공 `);
    //         }).catch((e)=>{
    //             console.log(`주문상세 실패 : `, e.messege);
    //             alert(`주문상세 실패`);
    //         })
    // },[]);

    return (
        <table className="orderListPageContainer">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>주문일자&주문번호</th>
              <th style={{ width: '45%' }}>상품정보</th>
              <th style={{ width: '10%' }}>가격&수량</th>
              <th style={{ width: '15%' }}>배송상태</th>
              <th style={{ width: '15%' }}>주문 취소</th>
            </tr>
          </thead>
          <tbody>
            {/* {detailData.map((d,i)=> (

                <tr key={i}>
                    <td> & {d.member_payment_code}</td>
                    <td>{`${d.protype} ${d.domestic} ${d.title} ${d.image}`}</td>
                    <td>{`${d.proamount} ${d.price}`}</td>
                    <td>상품준비중</td>
                    <td><button >주문 취소</button></td>
                </tr>
            ))} */}

            오더리스트
          </tbody>
        </table>
    );
}

export default OrderListPage;