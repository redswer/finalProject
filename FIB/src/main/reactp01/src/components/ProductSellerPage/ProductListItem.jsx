import './ProductListItem.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductListItem = (props) => {
  // =================================================================================================================
  // const [sell_countRate, setCount] = useState(0);
  // const targetNumber = props.sellcount; // 최종 도달 숫자
  // const animationDuration = 2000; // 애니메이션 시간 (밀리초)
  // const increment = targetNumber / (animationDuration / 10); // 10ms마다 증가할 숫자

  // useEffect(() => {

  //   const startTime = Date.now();
  //   const interval = setInterval(() => {
  //     const elapsedTime = Date.now() - startTime;
  //     const progress = Math.min(elapsedTime / animationDuration, 1);
  //     const newValue = Math.floor(progress * targetNumber);
  //     setCount(newValue);
  //     if (progress >= 1) {
  //       clearInterval(interval);
  //     }
  //   }, 10);
  //   return () => clearInterval(interval);
  // }, []);
  // =================================================================================================================

  const [proamount, setProamount] = useState(1);

  const loginID = sessionStorage.getItem("loginID");

  const [reviewData, setReviewData] = useState();

  //====================================================================================================================

  function saveOnCart() {
    const savedDataOnCart = {
      product_code: props.product_code,
      proamount: proamount,
      id: loginID
    };

    axios
      .post(`/cart/cartOnSaveAction`, savedDataOnCart)
      .then((response) => {
        console.log(`카트담기 성공 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        alert(`상품 장바구니에 담았어요. : ${response.data}`);

      }).catch((err) => {
        alert(`담기 실패!! ${err.message}`);
      });

  };

  const domesticLink = () => {
    alert(`정보확인 : ${props.product_code} + ${props.domestic} + ${props.category} + ${props.genre}`);
    console.log(`Product_code : `, props.product_code);
    props.urlNavigate(`/ProductListPage?domestic=${props.domestic}&category=${0}&genre=${0}`);
  }

  //====================================================================================================================
  const addProamount = () => {
    setProamount(proamount + 1);
  }


  const subtractProamount = () => {
    setProamount(proamount - 1);
    if (proamount <= 1) {
      setProamount(1);
    }
  }

  //====================================================================================================================

  function saveOnBookmark() {
    const savedDataOnBookmark = {
      product_code: props.product_code,
      id: loginID
    };

    axios
      .post(`/bookmark/bookmarkOnSaveAction`, savedDataOnBookmark)
      .then((response) => {
        console.log(`찜목록 성공 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        alert(`나의 찜목록에 담았어요`);

      }).catch((err) => {
        alert(`담기 실패!! ${err.message}`);
      });

  };

  const dataToPayment = [{
    product_code: props.product_code,
    title: props.title,
    image: props.image,
    price: props.price,
    proamount: proamount
  }]





  //====================================================================================================================


  return (
    <>
      <div className="productItemContainer">
        {/* ======================productItemImage=================================================== */}
        <div className='productItemImage'>
          <Link to={`/DetailPage/${props.product_code}`}><img src={`../img/yeonsu.jpg`} alt="이미지" /></Link>
        </div>
        {/* ======================productItemImage=================================================== */}



        {/* ======================productItemInfomation=================================================== */}
        <div className="productItemInfomation">
          <Link to={`/DetailPage/${props.product_code}`}><span className="productItemTitle">{props.title}</span></Link>
          <div className='productItemKeywordWrap'>
            <div className="productItemDomestic">
              {props.domestic == 1 ? '국내도서' :
                props.domestic == 2 ? '영미도서' :
                  props.domestic == 3 ? '프랑스도서' :
                    props.domestic == 4 ? '독일도서' : '기타도서'}
            </div>

            <div className="productItemCategory" >
              {props.category == 'novel' ? '소설' :
                props.category == 'poem' ? '시' :
                  props.category == 'essay' ? '에세이' :
                    props.category == 'magazine' ? '잡지' : '기타 카테고리'}
            </div>

            <div className="productItemGenre" >
              {props.genre == 'fantasy' ? '판타지' :
                props.genre == 'melo' ? '멜로' :
                  props.genre == 'detective' ? '추리' :
                    props.genre == 'sf' ? '공상과학'
                      : '기타 장르'}
            </div>
          </div>

          <div className='productItemWriterTranslatorPublisher'>
            <span className='productItemWTP'>{props.writer}작가명</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="productItemWTP">{props.translator}역식자</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="productItemWTP">{props.publisher}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="productItemWTP">{props.publish_date}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span> </span>
            <span>{props.gradeavg.toFixed(1)}</span>&nbsp;&nbsp;&nbsp;
            <span>리뷰 : {props.viewcount}</span>
          </div>


          <div className="productItemSummary">
            <Link to={`/DetailPage/${props.product_code}`}>{props.summary}summarysummarysummarysummarysummarysummary
              summarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummary
              summarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummaryv
              summarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummary
              summarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummary
              summarysummarysummarysummarysummarysummarysummarysummarysummary</Link>
          </div>


        </div>
        {/* ======================productItemInfomation=================================================== */}



        {/* ======================productItemSelling=================================================== */}
        <div className="seller_product_sell_sub_infomation">

          <div className="seller_publisher_box">
            <span className="seller_publisher_name"></span>
            <span className="seller_publisher_date"></span>&nbsp;&nbsp;
            <button type='button' onClick={saveOnBookmark} className='seller_product_payment_btn' >찜하기</button>
          </div>

          <hr />

          <hr />

          <div className="seller_product_expense">

            <div className='seller_product_pricebox'>
              <span>가격 : </span>
              <span className='seller_product_price'>{props.price}</span>
              <span> 원</span>
            </div>

          </div>

          <hr />

          <div className='seller_product_sales_rate_box'>
            <span className='product_sales_rate_1'>누적 판매량</span>
            <span className='product_sales_rate_1'> : </span>
            <span className='product_sales_rate'>{props.sellcount}</span>
            <span className='product_sales_rate_3'> 권</span>
          </div>

          <div className='seller_product_form_container'>


            <hr />

            <div>
              <span>수량 : </span>
              <button onClick={subtractProamount} className='productItemAddProamountButton' > - </button>
              <input type='number' value={proamount} name='proamount' id='proamount'
                className='productItemInputProamount'
                onChange={(e) => setProamount(e.target.value)} min={1}
              />
              <button onClick={addProamount} className='productItemSubtractProamountButton' > + </button>

              <div>
                &nbsp;&nbsp;<button type='submit' onClick={saveOnCart} className='seller_product_addcart_btn'>장바구니</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <Link to={`/PaymentPage`}
                  state={{ order_data: dataToPayment }}
                  className='probuynowletsgo'>
                  바로구매
                </Link>
              </div>



            </div>

          </div>
        </div>

      </div>

      <hr className='seller_product_division_hr' />

    </>
  );
};

export default ProductListItem;