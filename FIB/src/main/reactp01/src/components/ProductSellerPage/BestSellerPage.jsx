import './BestSellerPage.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import BestSellerItem from './BestSellerItem';
import RecentSideBar from './UiBox/RecentSideBar';
import KeywordSideBar from './UiBox/KeywordSideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
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

  //==========================================================================================================================
  const requestToServer = (initRequestURL) => {
    axios
      .get(`${initRequestURL}`)
      .then((response) => {
        const prevSearchParams = new URLSearchParams(urlString.search);
        console.log(`response 성공 :`, response.data);

        if (response.data && response.data.length > 0) {
          setProductData(response.data);

        } else {
        console.log(`requestToServer : 조건에 해당하는 도서가 없습니다.`);
        console.log(`resposne data : `, response.data);
        alert(`requestToServer : 조건에 해당하는 도서가 없습니다.`);

        }
      }).catch((err) => {
        alert(`requestToServer 서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(()=> {
    
    urlNavigate
    (`/BestSellerPage`);

    requestToServer
    (`/product/bestSeller`);

  },[])

//===========================================================================================================================

const [textWordValue,setTextWordValue] = useState('');


//============================================================================================================================
const [page, setPage] = useState(1);
const [size, setSize] = useState(3); // 한 페이지에 보여질 아이템 수

// productData를 현재 페이지에 따라 슬라이스하여 보여줍니다.
const indexOfLastItem = page * size;               // 현재 페이지에서 보여줄 첫번째 아이템의 index
const indexOfFirstItem = indexOfLastItem - size;   // 현재 페이지에서 보여줄 마지막 아이템의 index
const viewedList = productData.slice(indexOfFirstItem, indexOfLastItem);  // 현재 페이지에서 보여줄 List들.

const handlePageSizeChange = (event) => {
  const newSize = parseInt(event.target.value, 10);
  setSize(newSize);
};

// 페이지 변경 핸들러
const handlePageChange = (pageNumber) => {
  setPage(pageNumber);
};

// 페이지 번호를 생성합니다.
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(productData.length / size); i++) {
  pageNumbers.push(i);
}



//============================================================================================================================

  return (
    <div className='seller_page_container'>
      <div className='product_seller_categorybar_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <KeywordSideBar requestFromBarToServer={requestToServer} />
      </div>

      <div className='basket_preview_box_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <RecentSideBar />
      </div>

      <div className='seller_product_List_container'>
        <div className='seller_product_page_titlebox'>
          <div className='ProductListPage_Checkbox_container'>
             <h3>키워드 선택</h3>
          </div>

          <hr />
          <h2 className='seller_product_page_title'>베스트 셀러</h2>
        </div>

        <hr className='seller_product_page_titlebox_hr'/>

        <div className='seller_product_bookList'>
          {/* {viewedList} */}
          {/* {booklist} */}

          {viewedList.map((d, i) => (
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
              gradeavg={d.gradeavg}
              viewcount={d.viewcount}
              regdate={d.regdate}
              urlNavigate={urlNavigate}
            />          
  ))}
        </div>

        <div className='productListPage_pageNationButton'>
        {/* {ProductPagination} */}
        <ProductPagination
         pageNumbers={pageNumbers}
         page={page}
         handlePageChange={handlePageChange}
         />
        </div>

        <hr />
        <hr />
        
        

      </div>
      <SideButton />
    </div>

  );
};
export default BestSellerPage;