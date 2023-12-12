import './BasketPreviewBox.css';
import { Link } from 'react-router-dom'
import BasketPreviewList from './BasketPreviewList';
import { useEffect , useState } from 'react';
import axios from 'axios';


const BasketPreviewBox = () => {

  // const loginID = sessionStorage.getItem("loginID");

// const [bookData, setBookData] = useState({});

const [cookieBox,setCookieBox] = useState();

const [idCookie, setIdCookie] = useState();
const [pcodeCookie, setPcodeCookie] = useState();
const [bookData,setBookData] = useState();


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

useEffect(()=> {
    setCookieBox(getCookie('recentCookieProduct'));
},[]);


const parsedCookieList = cookieBox ? JSON.parse(decodeURIComponent(cookieBox)) : [];


      
const recentCookieProductList = parsedCookieList.map((d, i) => (
  <BasketPreviewList
    key={i}
    id={d.id}
    product_code={d.product_code}
    title={d.title}
    price={d.price}
  />
)); 



  return (
    <div className='basket_preview_box_detail_container'>
      <Link to='/BookmarkPage' className='from_preview_go_basket_btn'>
        이크에크 덴마크 북마크
      </Link>

      <hr />
      <hr />

      <Link to='/CartPage' className='from_preview_go_basket_btn'>
        장바구니로 이동하기
      </Link>

      <hr />
      <hr />

      <Link to='/OrderListPage' className='from_preview_go_basket_btn'>
        실험용 상세상세상세 
      </Link>

      <div>
        <h4>최근본상품</h4>
        {recentCookieProductList}
      </div>
      

    </div>
  );
};

export default BasketPreviewBox;