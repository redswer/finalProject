import { Link } from 'react-router-dom';
import './CartItem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BasketItem = (props) => {
//===============================================================================================================
const { proamount , setProamount , isAllChecked} = props;

const [isChecked, setIsChecked] = useState(0);

  function addProamount() {
    setProamount(proamount+1);
    // console.log(`더하기 변경 확인 : `,proamount);
  };

  function subtractProamount() {
    setProamount(proamount-1);
    console.log(`subtract내부 : `,proamount);
    if(proamount <= 1) {
      setProamount(1);
    }
    // console.log(`빼기 변경 확인 : `,proamount);
  };

//===============================================================================================================

  useEffect(()=> {
    const UpdatedProamountData = {
      cart_code : props.cart_code,
      product_code: props.product_code,
      proamount: proamount
      };
  
      axios
        .post(`/cart/cartProamountUpdateAction`,UpdatedProamountData)
        .then((response) => {
          // console.log(`수량 변경 성공 :`, response);
          // console.log('========================================');
          // alert(`수량 변경 성공`, response);
          
          }).catch((err) => {
            alert(`수량 변경 실패!! ${err.message}`);
      });

  },[proamount]);
    
  

  //===============================================================================================================
  
  function DeleteThisProduct() {
    
    const DeleteThisProductData = {
      product_code: props.product_code,
      cart_code : props.cart_code
      };
  
      axios
        .post(`/cart/cartDeleteThisAction`, DeleteThisProductData)
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
  
  props.onSelectItem(props.cart_code, 
    props.product_code, 
    props.protype,
    props.domestic,
    props.title,
    props.image,
    props.proamount,
    props.price,
    !isChecked);

    console.log(`개당체크 : ` , isChecked);

  
};


  useEffect(() => {
    setIsChecked(isAllChecked);
  }, [isAllChecked]);

  console.log(`isChecked[Item](${props.cart_code}) & ${isChecked} ======Item 절취선======Item 절취선======`);
  // console.log(`======Item 절취선======Item 절취선======Item 절취선======Item 절취선======`);
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
              <span className='basket__title'> {`[ ${props.cart_code} ]`}&nbsp;&nbsp;:&nbsp;&nbsp;</span>
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
            <span className='col-product_price_saled_num'>{props.price.toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>

        <div className='col-product_amount_item'>
          <div>
            <button type='button' onClick={subtractProamount}>-</button>
            <input className='col-proamount' type='number' value={proamount} name='itemProamount' 
            id='itemProamount' onChange={(e)=>
             {
              setProamount(e.target.value);
              console.log(`e.타겟 변경 확인 : `,proamount);
              }
              } min={1}/>
            <button type='button' onClick={addProamount}>+</button>
          </div>
        </div>


        <div className='col-product_del-info_item' >
          <div className="division-delivery">
            <span>배송금액 </span>
            <span> : </span>
            <span>3,500 원</span>
          </div>
        </div>

        <div className='col-product_btn_item'>
          <div className="divisionorder">
            <div className='divivi1'>
              {/* <button type='submit' onClick={UpdateProamount} className='seller_product_addcart_btn'>수량변경</button> */}
              <button type='submit' onClick={DeleteThisProduct} className='seller_product_payment_btn' >삭제{props.cart_code}</button>
              <button >주문하기</button>
            </div>
            
          </div>
        </div>
      </div>
    </form>
  );

}



export default BasketItem;
