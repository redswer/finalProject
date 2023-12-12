import { Link } from 'react-router-dom';
import './BookmarkItem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkItem = (props) => {
//===============================================================================================================
const { isAllChecked} = props;

const [isChecked, setIsChecked] = useState(0);

const loginID = sessionStorage.getItem("loginID");

function saveOnCart () {
  const savedDataOnCart = {
    bookmark_code:props.bookmark_code,
    product_code: props.product_code,
    id : loginID,
    proamount : 1
    };

    axios
      .post(`/cart/cartOnSaveAction`,savedDataOnCart)
      .then((response) => {
        console.log(`카트담기 성공 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        // alert(`카트담기 성공 : ${response.data}`);
        
        }).catch((err) => {
		      alert(`담기 실패!! ${err.message}`);
    });
    
};

//===============================================================================================================

  function DeleteThisProduct() {
    
    const DeleteThisProductData = {
      product_code: props.product_code,
      bookmark_code : props.bookmark_code
      };
  
      axios
        .post(`/bookmark/bookmarkDeleteThisAction`, DeleteThisProductData)
        .then((response) => {
          console.log(`카트목록 삭제 성공 : `, response.data);
          console.log('========================================');
          alert(`카트목록 삭제  성공 `, response.data);
          
        }).catch((err) => {
            alert(`카트목록 삭제 실패!! ${err.message}`);
            console.log(props.cart_code);
      });

      window.location.reload();
      
  };


//=====================================================================================================

// 부모 컴포넌트로 선택된 상태와 함께 cart_code 전달
const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
  
  props.onSelectItem(
    props.bookmark_code, 
    props.product_code, 
    props.protype,
    props.domestic,
    props.title,
    props.image,
    props.price,
    !isChecked);

    console.log(`개당체크 : ` , isChecked);

  
};


  useEffect(() => {
    setIsChecked(isAllChecked);
  }, [isAllChecked]);

  console.log(`isChecked[Item](${props.bookmark_code}) & ${isChecked} ======Item 절취선======Item 절취선======`);
  // console.log(`selectAllCartList[Item](102) : ` , selectAllCartList);
  
  
  
  
  //=====================================================================================================
  return (
    // <form onSubmit={(e)=>{e.preventDefault()}}>
    <form>
      <div className='basket_product_list'>
        {/* 체크박스 부분 */}
        <div > 
        <input  style={{width:'50px', height:'50px'}} type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </div>
        <div className='col-product_title_item'>
          <img src={props.image} alt="image" />
          <div className='col-product_tfc'>

            <div>
              <span className='basket__title'>{` < ${props.title} > `}</span>
            </div>

            <div>
              <span className='basket__title'> {`[ ${props.bookmark_code} ]`}&nbsp;&nbsp;:&nbsp;&nbsp;</span>
              <span className='basket__title'>{props.product_code}</span>
            </div>

            <div className='basket__fc'>
              <span className='basket__from'>{props.domestic}</span>
              <span className='basket__from'>{props.protype}</span>
            </div>
          </div>

        </div>

        <div className='col-product_price_item'>
          {/* <div className="col-product_price_origin">
            <div>상품 가격 : {props.price.toLocaleString()} 원</div>
          </div> */}
          <div className="col-product_price_saled">
            <span>상품 가격 : </span>
            <span className='col-product_price_saled_num'>{props.price ? props.price.toLocaleString() : 'nonePrice'}</span>
            <span>원</span>
          </div>
        </div>

        <div className='col-product_btn_item'>
          <div className="divisionorder">
            <div className='divivi1'>
              <button type='submit' onClick={saveOnCart} className='seller_product_payment_btn' >장바구니 담기{props.bookmark_code}</button>
              <button type='submit' onClick={DeleteThisProduct} className='seller_product_payment_btn' >삭제{props.bookmark_code}</button>
            </div>
            
          </div>
        </div>
      </div>
    </form>
  );

}



export default BookmarkItem;
