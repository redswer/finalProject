import './BookmarkPage.css';
import {useState, useEffect } from 'react';
import BookmarkItem from './BookmarkItem';
import { Link } from 'react-router-dom';
// import BasketEtcBox from './BasketEtcBox';
// import CategoryMiniBox from './CategoryMiniBox';
import axios from 'axios';

const BookmarkPage = () => {
  //=======================================================================================================
  const [bookmarkData, setBookmarkData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [totalPrice,setTotalPrice] = useState(0);
  // const [selectAllCartList, setSelectAllCartList] = useState(0);
  const [isAllChecked , setIsAllChecked] = useState(0);
  const [theNewCartList ,setTheNewCartList] = useState([]);

  const loginID = sessionStorage.getItem("loginID");

  useEffect(() => {
    axios
      .get(`/bookmark/bookmarklistParam?id=${loginID}`)
      .then((response) => {
        console.log(`response 성공 :`, response);
        // console.log(`response.data[0] : `, response.data[0]);
        // console.log(`response.data[1] : `, response.data[1]);
        console.log('========================================');
        
        setBookmarkData(response.data);
        
        }).catch((err) => {
		      alert(`서버연결 실패 => ${err.message}`);
    });
},[]);


//=========================================================================================================================
function saveOnCartSelecedItems () {

    axios
      .post(`/cart/cartOnSaveFromBookmark`,selectedItems)
      .then((response) => {
        console.log(`카트담기 성공 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        alert(`카트담기 성공 : ${response.status}`);
        
        }).catch((err) => {
		      alert(`담기 실패!! ${err.message}`);
    });
    
};
//=========================================================================================================================
  const handleSelectItem = (bookmark_code, product_code , protype ,domestic ,title, image ,price,isChecked) => {
    setSelectedItems((prevSelectedItems) => {
      if (isChecked == true) {
        // 선택된 아이템 추가
        return [
          ...prevSelectedItems,
          { 
            id : loginID,
            bookmark_code : bookmark_code ,
            product_code : product_code,
            protype : protype,
            domestic : domestic,
            title : title,
            image : image,
            price : price,
          }
        ];
      } else {
      return prevSelectedItems.filter((item) => item.bookmark_code !== bookmark_code);
    }

   });
  };

  //=========================================================================================================================

  const handleAllSelectBookmarkLists = (e) => {
    setIsAllChecked(e);

    if(e==1) {
      setSelectedItems(bookmarkData);
    }

     else {
      setSelectedItems([]);
     }

    console.log(`e : ` , e);

  };

  //=========================================================================================================================

  const handleDeleteSelected = () => {
    const selectedCartCodeArray = selectedItems.map((item) => item.bookmark_code);

    console.log(`selectdCartCodeArray : ` , selectedCartCodeArray);

    axios
      .post(`/Bookmark/BookmarkDeleteSelectedAction`, selectedCartCodeArray)
      .then((response) => {
        console.log(`선택목록 삭제 성공:`, response.data);
        console.log('========================================');
        alert(`선택목록 삭제 성공`, response.data);
        
        axios
        .get(`/bookmark/bookmarklistParam?id=${loginID}`)
        .then((response) => {
          console.log(`response 성공 :`, response);
          // console.log(`response.data[0] : `, response.data[0]);
          // console.log(`response.data[1] : `, response.data[1]);
          // console.log('========================================');
          setBookmarkData(response.data);

        }).catch((err) => {
		      alert(`서버연결 실패 => ${err.message}`);
          });
        

      }).catch((err) => {
        alert(`선택목록 삭제 실패!! ${err.message}`);
      });

      window.location.reload(); // 일단 그냥 새로고침 ㄱㄱ.

  };

  
  //====================================================================================================================

 

  console.log(`selectedItems(BookMark)[Page] : ` , selectedItems);
  // console.log(`totalPrice[Page](147) : ` , totalPrice);
  console.log(`isAllChecked[Page](151) : ` , isAllChecked);
  console.log(`======Page 분단======Page 분단======Page 분단======Page 분단======Page 분단======`);

  //====================================================================================================================

  const bookmarkList = bookmarkData.map((d, i) => (
    <BookmarkItem
      key={i}
      bookmark_code={d.bookmark_code}
      id={loginID}
      product_code={d.product_code}
      protype={d.protype}
      domestic={d.domestic}
      title={d.title}
      image={d.image}
      price={d.price}
      onSelectItem={handleSelectItem}
      // onUpdateCart={handleUpdateCart}
      onDeleteSelected={handleDeleteSelected}
      onSelectAllItems={handleAllSelectBookmarkLists}
      isAllChecked={isAllChecked}
    />
  )); 

  
  
  //=====================================================================================================================
  return (
    <div className='basket_top_level_container'>
      <h1>나의 찜목록</h1>
      {/* <span>찜찜찜 아구찜은 별론데 갈비찜은 존맛탱구리 예스예스베이비 컴온 컴온. : </span> */}
     
      {/* <button onClick={handleDeleteSelected}>선택목록 삭제</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      {/* <button onClick={saveOnCartSelecedItems}>선택목록장바구니 담기</button>&nbsp;&nbsp;&nbsp; */}


      {/* <input type='checkbox' style={{width:'50px', height:'50px'}} checked={isAllChecked} */}
       {/* onChange={(e) => {handleAllSelectBookmarkLists(e.target.checked)}} />전체 선택&nbsp;&nbsp;&nbsp; */}

      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to={`/CartPage`}>장바구니 ㄱㄱ</Link> */}

      <div className='basketlist_list_container'>

        <div className='basketlist_head'>
          <div className="col-product_title">상품명</div>
          <div className="col-product_price">상품 가격</div>
          <div className="col-product_btn">장바구니 / 삭제</div>
        </div>

        <div>
          {bookmarkList}
        </div>


      </div>

      <div className='basket_total_sum_container'>
        <div className='basket_figure_flex_box'>

          {/* <CategoryMiniBox /> */}
        </div>

         <div className='basket_final_product_order_btn_box'>

          <Link to='/'><button className='basket_final_product_order_btn_1'>계속 쇼핑하기</button></Link>

          <div className='basket_final_product_order_btn_2'>
          <Link to={`/CartPage`}>장바구니바로가기</Link>
          </div>
          

        </div>

      </div>

      <div>
        {/* <BasketEtcBox /> */}
      </div>

    </div>
  );
};


export default BookmarkPage;