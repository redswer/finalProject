import './BasketPreviewBox.css';
import { Link } from 'react-router-dom'
import BasketPreviewList from './BasketPreviewList';
import { useEffect , useState } from 'react';
import axios from 'axios';


const BasketPreviewBox = () => {

  const loginID = sessionStorage.getItem("loginID");

const [bookData,setBookData] = useState([]);

// useEffect(()=> {
//     axios
//       .get(`/product/productSelectedList?domestic=1&category=novel&genre=0`)
//       .then((response) => {
//         console.log(`response 성공 :`, response);
//         setBookData(response.data);
//         }).catch((err) => {
//         alert(`최근본상품목록실패 => ${err.message}`);
//       });
  
// },[]);

// const preData = bookData.slice(0, 5).map((d, i) => (
//   <BasketPreviewList
//     key={i}
//     id={d.id}
//     product_code={d.product_code}
//     title={d.title}
//     price={d.price}
//   />
// ));



  return (
  <div>
    <div className='basket_preview_box_detail_container'>
      <Link to='/BookmarkPage' className='from_preview_go_basket_btn'>
        북마크 바로가기
      </Link>

      <hr />
      <hr />

      <Link to='/CartPage' className='from_preview_go_basket_btn'>
        장바구니로 이동하기
      </Link>

      <hr />
      <hr />

      {/* <Link to='/OrderListPage' className='from_preview_go_basket_btn'>
        실험용 상세상세상세 
      </Link> */}
{/* 
      <div>
        <h4 className='rect'>{` < 최근본상품 > `}</h4>
        {preData}
      </div> */}
      

    </div>
  </div>
  );
};

export default BasketPreviewBox;