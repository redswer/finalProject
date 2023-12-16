import './RecentSideBar.css';
import { Link } from 'react-router-dom'
import RecentSideBarItem from './RecentSideBarItem';
import { useEffect , useState } from 'react';
import axios from 'axios';


const RecentSideBar = () => {

  const loginID = sessionStorage.getItem("loginID");

const [recentData,setRecentData] = useState([]);

useEffect(()=> {
  axios
    .get(`/product/selectRecentProductList?id=${loginID}`)
    .then((response)=> {
      alert(`최근본상품 목록 불러오기 성공 ^~^ : `,response.data);
      if(response.data) {
        setRecentData(response.data);
      }
    }).catch((e)=> {
      console.log(`최근본상품목록이 없음`);
    })
},[])

const recentList = recentData.map((d,i)=> (
  <RecentSideBarItem
  key={i}
  pcode={d.product_code}
  title={d.title}
  image={d.image}
  price={d.price}

  />
))

//=====================================================================================

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

      <div>
        <h4 className='rect'>{` < 최근본상품 > `}</h4>
        {recentList}
      </div>
      

    </div>
  </div>
  );
};

export default RecentSideBar;