import './OrderListPage.css';
import OrderListDateSelect from './OrderListDateSelect';
import OrderListDelProCau from './OrderListDelProCau';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function OrderListPage() {

  const loginID = sessionStorage.getItem("loginID");
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    axios
      .get(`/mpdetail/mpdList?id=${loginID}`)
      .then((res) => {
        setDetailData(res.data);
        console.log(`주문상세 성공 : `, res.data);
        // alert(`주문상세 성공 `);
      }).catch((e) => {
        console.log(`주문상세 실패 : `, e.messege);
        alert(`주문상세 실패`);
      })
  }, []);

  return (
    <table className="orderListPageContainer">
      <thead>
        <tr>
          <th style={{ width: '15%' }}>주문일자 / 주문번호</th>
          <th style={{ width: '45%' }}>상품정보</th>
          <th style={{ width: '10%' }}>가격&수량</th>
          <th style={{ width: '15%' }}>배송상태</th>
          <th style={{ width: '15%' }}>주문 취소</th>
        </tr>
      </thead>
      <tbody>
        {detailData.map((d, i) => (

          <tr key={i} className='orderDetailItem'>
            <td className='orderDetailDataPmCode'>
              <div className='orderDetailData'>{d.payment_date}</div>
              <div className='orderDetailPmCode'>{`[ ${d.member_payment_code} ]`}</div>
            </td>

            <td className='orderDetailItemInfomation'>
              <img src={`../img/yeonsu.jpg`} className='orderListItemImg'></img>
              <div>
                <span>{d.title}제목</span>
                <span>{d.domestic}</span>
                <span>{d.protype}</span>
                <div></div>
                <div></div>
              </div>
            </td>

            <td>{`${d.proamount} ${d.price}`}</td>
            <td>상품준비중</td>
            <td><button >주문 취소</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderListPage;