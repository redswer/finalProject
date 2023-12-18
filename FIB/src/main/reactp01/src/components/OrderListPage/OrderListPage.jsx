import './OrderListPage.css';
import OrderListDateSelect from './OrderListDateSelect';
import OrderListDelProCau from './OrderListDelProCau';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function OrderListPage() {

  const loginID = sessionStorage.getItem("loginID");
  const [detailData, setDetailData] = useState([]);
  const [fromYear, setFromYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [fromDay, setFromDay] = useState('');

  const [toYear, setToYear] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [toDay, setToDay] = useState('');

  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');

  useEffect(() => {
    axios
      .get(`/mpdetail/mpdList?id=${loginID}`)
      .then((response) => {
        setDetailData(response.data);
        console.log(`주문상세 성공 : `, response.data);
      }).catch((e) => {
        console.log(`주문상세 실패 : `, e.messege);
        alert(`주문상세 실패`);
      })
  }, []);
  //==========================================================================================================================

  const searchDataForDate = () => {
    axios
      .get(`/mpdetail/searchDate?fromDate=${fromYear}-${fromMonth}-${fromDay}&toDate=${toYear}-${toMonth}-${toDay}`)
      .then((response) => {
        console.log(`서치성공 : `, response.data);
        alert(`서치데이타 석세스 : `, response.data);
        setDetailData(response.data);
      }).catch((error) => {
        console.log(`서치데이터 문제 발생 : `, error.messege);
        alert(`서치데이터를 실패햇넹 : `, error.messege);
      })
  };

  //==========================================================================================================================

  return (
    <div className='orderListPageContainer' >
      <div>
        <div className="orderdelivery-title">주문/배송조회</div>
        <div className='orderlist_sub_title'>고객님께서 구매하셨던 상품목록들을 확인하실 수 있는 페이지입니다.</div>

        <div className="orderDetailSearchDateArea">
          <div className="orderDetailForSelectingDateDirection">조회기간</div>
          <div className="orderDetailSelectingDateBox">
            <div className="orderDetailSelectingDate">

              <select value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>

              <span className="selectdate-detaildate-year">년</span>

              <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>

              <span className="selectdate-detaildate-month">월</span>

              <select value={fromDay} onChange={(e) => setFromDay(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>

              <span className="selectdate-detaildate-day">일</span>

              {/* ~~~~~~~~~~~~~~~~~~~from~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <span className="selectdate-detaildate-margin"> ~ </span>
              {/* ~~~~~~~~~~~~~~~~~~~to~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              <select value={toYear} onChange={(e) => setToYear(e.target.value)}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>

              <span className="selectdate-detaildate-year">년</span>

              <select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>

              <span className="selectdate-detaildate-month">월</span>

              <select value={toDay} onChange={(e) => setToDay(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>

              <span className="selectdate-detaildate-day">일</span>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <button type='button' onClick={searchDataForDate} className='searchDataForDateButton'>검색하기</button>
            </div>

          </div>

        </div>
      </div>

      {/* 주문상세 테이블 =========================================================================== */}
      <table className="orderListPageTable">
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
          {detailData.length === 0 ?
            <tr className='orderDetailDataIsVacant'>
              <td colSpan='5'>아직 주문한 상품이 없습니다.</td>
            </tr>
            :
            detailData.map((d, i) => (

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

      <OrderListDelProCau />
    </div >
  );
}

export default OrderListPage;