import './BestSellerPage.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import BestSellerItem from './BestSellerItem';
import BasketPreviewBox from './UiBox/RecentSideBar';
import ProductSellerCategoryBar from './UiBox/KeywordSideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BestSellerPage = () => {
  // =================================================================================================================
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //==========================================================================================================================
  const [urlString , setUrlString] = useState(useLocation());
  const urlNavigate = useNavigate();
  const urlParams = new URLSearchParams(urlString.search);
  
  const [productData, setProductData] = useState([]);
  const [resultDTO , setResultDTO] = useState({});

  const [nowSize , setNowSize] = useState(5);

  const [selectedPage, setSelectedPage] = useState(1);

  //==========================================================================================================================
  const requestToServer = (initRequestURL) => {

    axios
      .get(`${initRequestURL}`)
      .then((response) => {
        console.log(`response 성공 :`, response);
        console.log('========================================');
        if (response.data && response.data.entityList.length > 0) {

          setResultDTO(response.data);
          setProductData(response.data.entityList);
          // alert(`setResultDTO 성공 : `,response.data.entityList);
          console.log(`setResultDTOBestSeller 성공 : `,response.data.entityList);
  

        } else {
        console.log(`requestToServerBestSeller : 조건에 해당하는 도서가 없습니다.`);
        console.log(`resposne data : `, response.data);

        alert(`requestToServerBestSeller : 조건에 해당하는 도서가 없습니다.`);

        }
      })
      .catch((err) => {
        alert(`서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(()=> {
    requestToServer
    (`/product/bestSeller?page=1&size=5`);
    
  },[])

  console.log(`setResultDTO : ` , resultDTO);
  console.log(`setProductData : ` , productData);

  

//============================================================================================================================

const movePage = (page) => {
  const lastPage = resultDTO.pageList ? resultDTO.pageList[resultDTO.pageList.length - 1] : 1;

  if (page > 0 && page <= lastPage) {
    setSelectedPage(page);

      urlNavigate
      (`/BestSellerPage?&page=${page}&size=${nowSize}`);

      requestToServer
      (`/product/bestSeller?&page=${page}&size=${nowSize}`);

      alert(`페이지 이동해유 ^~^`);
  }

};

const moveToPreviousPage = () => {
  movePage(selectedPage - 1);
};

const moveToNextPage = () => {
  movePage(selectedPage + 1);
};

const moveToFirstPage = () => {
  movePage(1);
};

const moveToLastPage = () => {
  const lastPage = resultDTO.pageList ? resultDTO.pageList[resultDTO.pageList.length - 1] : 1;
  movePage(lastPage);
};

//============================================================================================================================

const handleSelectChange = (event) => {
  const newSize = parseInt(event.target.value, 10); // 선택된 option의 값을 정수로 변환
  setNowSize(newSize); // nowSize를 새로운 값으로 업데이트
};

useEffect(()=> {
  urlNavigate
  (`/BestSellerPage?&page=1&size=${nowSize}`);

  requestToServer
  (`/product/bestSeller?&page=1&size=${nowSize}`);

  // alert(`사이즈변경으로 리로링 ^~^`);

},[nowSize]);

//============================================================================================================================

const pageNavigation = resultDTO.pageList ? resultDTO.pageList.map((data, i) => (
  <button
    key={i}
    onClick={() => movePage(data)}
    className={`productList_pageNationButton_${selectedPage === data ? 'selected' : ''}`}
  >
    {data}
  </button>
)) : null;


//============================================================================================================================
const bookList = productData.map((d, i) => (
  <BestSellerItem
    key={i}
    product_code={d.product_code}
    domestic={d.domestic}
    protype={d.protype}
    writer={d.writer_code}
    title={d.title}
    translator={d.translator}
    publisher={d.publisher}
    publish_date={d.publish_date}
    category={d.category}
    genre={d.genre}
    summary={d.summary}
    image={d.image}
    intro_image={d.intro_image}
    content={d.content}
    price={d.price}
    sellcount={d.sellcount}
    urlNavigate={urlNavigate}
  />
));


//============================================================================================================================

  return (
    <div className='seller_page_container'>
      <div className='product_seller_categorybar_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <ProductSellerCategoryBar requestFromBarToServer={requestToServer} />
      </div>

      <div className='basket_preview_box_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <BasketPreviewBox />
      </div>

      <div className='seller_product_List_container'>
        <div className='seller_product_page_titlebox'>
          <div className='ProductListPage_Checkbox_container'>

              <select onChange={handleSelectChange} value={nowSize}>
                <option value="2">2개씩 보기</option>
                <option value="3">3개씩 보기</option>
                <option value="5">5개씩 보기</option>
                <option value="7">7개씩 보기</option>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
              </select>

              <hr />
          </div>

          <hr />

          <div className='ProductListPage_SortOption'>
          </div>

          {/* <div>
            <input type="text" />
          </div> */}
             
          <h2 className='seller_product_page_title'>베스트셀러</h2>
        </div>

        <hr className='seller_product_page_titlebox_hr'/>

        <div className='seller_product_bookList'>
          {bookList}
        </div>

        <div className='productListPage_pageNationButton'>
        <button onClick={moveToFirstPage}>처음으로</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={moveToPreviousPage}>이전 페이지</button>
        <span>{pageNavigation}</span>
        <button onClick={moveToNextPage}>다음 페이지</button>
        &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={moveToLastPage}>끝으로</button>
        </div>

        <hr />
        <hr />
        
        

      </div>
      <SideButton />
    </div>

  );
};
 // ProductListPage
export default BestSellerPage;