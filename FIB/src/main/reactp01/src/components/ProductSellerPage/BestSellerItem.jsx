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

const [proamount ,setProamount] = useState(1);

const loginID = sessionStorage.getItem("loginID");

const [reviewData,setReviewData] =useState();

//====================================================================================================================

function saveOnCart () {
  const savedDataOnCart = {
    product_code: props.product_code,
    proamount: proamount,
    id : loginID
    };

    axios
      .post(`/cart/cartOnSaveAction`,savedDataOnCart)
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
  console.log(`Product_code : ` , props.product_code);
  props.urlNavigate(`/ProductListPage?domestic=${props.domestic}&category=${0}&genre=${0}`);
}

//====================================================================================================================

function saveOnBookmark () {
  const savedDataOnBookmark = {
    product_code: props.product_code,
    id : loginID
    };

    axios
      .post(`/bookmark/bookmarkOnSaveAction`,savedDataOnBookmark)
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
  product_code : props.product_code,
  title : props.title,
  image : props.image,
  price : props.price,
  proamount : proamount
}]





//====================================================================================================================


  return (
    <>
    <form onSubmit={(e)=>{e.preventDefault()}}>
      <div className="seller_product_card_container">

      <div className='seller_product_pricebox'>
              {/* <h3>product_code</h3> */}
              {/* <h3>{props.product_code}</h3> */}
            </div>

        <div>
          <Link to={`/DetailPage/1`}><img src={`../img/yeonsu.jpg`} alt="이미지" /></Link>
        </div>

        <div className="seller_product_infomation">
          <div className='seller_product_rtfc_box'>
            {/* <Link to={`/DetailPage/${props.product_code}`}><span className="seller_product_rank">1</span></Link> */}
            <Link to={`/DetailPage/${props.product_code}`}><span className="seller_product_title">{props.title}</span></Link>

            
            <div>

            
            <div className="seller_product_domestic" onClick={domesticLink} >
            {props.domestic ==1 ? '국내도서' : 
              props.domestic == 2 ? '영미도서' : 
              props.domestic == 3 ? '프랑스도서' :
              props.domestic == 4 ? '독일도서' :'기타도서'}
            </div>

            <Link to={`/ProductListPage?domestic=${0}&category=${props.category}&genre=${0}`}
              onClick={domesticLink}>
                
            <div className="seller_product_category" >
              {props.category == 'novel' ? '소설' :
              props.category == 'poem' ? '시' :
              props.category == 'essay' ? '에세이' :
              props.category == 'magazine' ? '잡지' :'기타 카테고리'}
              </div></Link>

              <Link to={`/ProductListPage?domestic=${0}&category=${0}&genre=${props.genre}`}
                onClick={domesticLink}>

                <div className="seller_product_type" >
              {props.genre == 'fantasy' ? '판타지' :
              props.genre == 'melo' ? '멜로' :
              props.genre == 'detective' ? '추리' :
              props.genre == 'sf' ? '공상과학' 
              : '기타 장르'}
              </div></Link>
              </div>
          </div>

          <div>
            <span className='seller_product_writer'>{props.writer}</span>
            <span className="seller_compiler_name">{props.tranlator}</span>
          </div>

          <Link to={`/DetailPage/${props.product_code}`}><div className="seller_product_explain">explain</div></Link>

        </div>

        <div className="seller_product_sell_sub_infomation">

          <div className="seller_publisher_box">
            <span className="seller_publisher_name">{props.publisher}</span>
            <span>|</span>
            <span className="seller_publisher_date">{props.publish_date}</span>&nbsp;&nbsp;
            <button type='button' onClick={saveOnBookmark} className='seller_product_payment_btn' >찜하기</button>
          </div>

          <hr />
            <span>평균 별점 : {props.gradeavg}</span>&nbsp;&nbsp;&nbsp;
            <span>리뷰수 : {props.viewcount}</span>
          <hr />

          <div className="seller_product_expense">

            <div className='seller_product_pricebox'>
              <span>가격 : </span>
              <span className='seller_product_price'>{props.price}</span>
              <span> 원</span>
            </div>

            {/* <div className='seller_product_saleperbox'>
              <span>할인 적용가 : </span>
              <span className="seller_product_saleper">3333</span>
              <span> 원</span>

            </div> */}
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
          <span>수량 : 
          <input type='number' value={proamount} name='proamount' id='proamount' 
           onChange={(e)=>setProamount(e.target.value)} min={1}
          />
          </span>

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

    </form>
    </>
  );
};

export default ProductListItem;