import './UiBox/SellerPageCommonCSS.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import SellerProductCard from './UiBox/SellerProductCard';
import BasketPreviewBox from './UiBox/BasketPreviewBox';
import ProductSellerCategoryBar from './UiBox/ProductSellerCategoryBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
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
  
  const [urlDomesticValue , setUrlDomesticValue] = useState(0);
  const [urlCategoryValue , setUrlCategoryValue] = useState(0);
  const [urlGenreValue , setUrlGenreValue] = useState(0);

  // const [requestURL , setRequestURL] = useState();
  const [productData, setProductData] = useState([]);
  const [titleDomestic , setTitleDomestic] = useState(0);
  const [titleCategory , setTitleCategory] = useState(0);
  const [titleGenre , setTitleGenre] = useState(0);
  const [limitedMinPrice , setLimitedMinPrice] = useState(0);
  const [limitedMaxPrice , setLimitedMaxPrice] = useState(0);

  // console.log(`현재 urlString[Page](41) : ` ,urlString);
  // console.log(`현재 urluseLocation()[Page](42) : `,useLocation());
  // console.log(`현재 urlString.search[Page](43) : `,urlString.search);

  //==========================================================================================================================
  const requestToServer = (initRequestURL) => {

    // alert(`initRequestURL :: ` , initRequestURL);

    axios
      .get(`${initRequestURL}`)
      .then((response) => {
        const prevSearchParams = new URLSearchParams(urlString.search);
        console.log(`response 성공 :`, response);
        // console.log(`fetchData-response.data[0] : `, response.data[0]);
        console.log('========================================');
        if (response.data && response.data.length > 0) {
          setProductData(response.data);
          // alert(`fetchData : 데이터가 존재합니다!! yes come on!!`);
        } else {
        console.log(`fetchData : 조건에 해당하는 도서가 없습니다.`);
        alert(`fetchData : 조건에 해당하는 도서가 없습니다.`);

        // const prevSearchParams = new URLSearchParams(urlString.search);

        const newURL = `/ProductListPage?${prevSearchParams.toString()}`;

        // if (urlString.search !== `?${prevSearchParams.toString()}`) {
          // urlNavigate(newURL);
        // }
        urlNavigate(newURL);

        }
      })
      .catch((err) => {
        alert(`서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(()=> {
    // alert(`첫 mount where ProductListPage`);
    requestToServer
    (`/product/productSelectedList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`);
    
  },[])

  
//===========================================================================================================================

const [selectedOptions, setSelectedOptions] = useState({
  domestic :'0',
  category :'0',
  genre:'0'
});

const handleKeywordChange = (keyword, value) => {
  setSelectedOptions((prevOptions) => ({
    ...prevOptions,
    [keyword]: prevOptions[keyword] === value ? '0' : value,
  }));
};

//============================================================================================================================

const handleSelectedKeywordDefault = () => {
  // 선택된 옵션들을 이용하여 파라미터를 생성합니다.

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {

    // setUrlDomesticValue(selectedOptions.domestic);
    // setUrlCategoryValue(selectedOptions.category);
    // setUrlGenreValue(selectedOptions.genre);

    requestToServer
    (`/product/productSelectedList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    
    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    // updateUrlParams();
  } else {
    // alert(`이런이런, 카테고리부터 선택하라구 Boy↗↘♬ ^-^  ~0~`);
    requestToServer
    (`/product/productSelectedList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`)
    console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    // alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }
  
  
};

//============================================================================================================================
    
const handleSelectedKeywordAscending = () => {   // 최저가
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productAscendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
  } else {
    // fetchData(`/product/productAscendingList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`);
    // alert(`이런이런 카테고리를 선택해주세용 ^-^  ~0~`);
    requestToServer
    (`/product/productAscendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
    alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }
}

//============================================================================================================================
const handleSelectedKeywordDescending = () => {   // 최고가
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productDescendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
  } else {
    // fetchData(`/product/productAscendingList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`);
    // alert(`이런이런 카테고리를 선택해주세용 ^-^  ~0~`);
    requestToServer
    (`/product/productAscendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
    alert(`현재 파람 값으로 최고가순 재검색합니다 ^~^`);
  }
}

//============================================================================================================================
const handleSelectedKeywordSellCount = () => {   // 판매량
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productAscendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
  } else {
    requestToServer
    (`/product/productAscendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
    alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }
}

//============================================================================================================================

const handleSelectedKeywordLimitedPrice = () => {   // 가격제한된
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}
    &min=${limitedMinPrice}&max=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
  } else {
    // fetchData(`/product/productAscendingList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`);
    // alert(`이런이런 카테고리를 선택해주세용 ^-^  ~0~`);
    requestToServer
    (`/product/productLimitedPriceList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}
    &min=${limitedMinPrice}&max=${limitedMaxPrice}`)
    alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }
}

//=======================================================================================

console.log(`limitedMinPrice : `,limitedMinPrice);
console.log(`limitedMaxPrice : `,limitedMaxPrice);

//============================================================================================================================
const bookList = productData.map((d, i) => (
  <SellerProductCard
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
    sell_count={d.sell_count}
    urlNavigate={urlNavigate}
  />
)); 

//============================================================================================================================
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
             <h3>키워드 선택</h3>
             <div>국가 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='domestic1' name='domestic' value='1'
             checked={selectedOptions.domestic.includes('1')}
             onChange={() => handleKeywordChange('domestic', '1')}/>국내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='domestic2' name='domestic' value='2'
             checked={selectedOptions.domestic.includes('2')}
             onChange={() => handleKeywordChange('domestic', '2')}/>영미&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='domestic3' name='domestic' value='3'
             checked={selectedOptions.domestic.includes('3')}
             onChange={() => handleKeywordChange('domestic', '3')} />프랑스&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='domestic4' name='domestic' value='4'
             checked={selectedOptions.domestic.includes('4')}
             onChange={() => handleKeywordChange('domestic', '4')} />독일&nbsp;&nbsp;&nbsp;&nbsp;
             </div>

             <div>카테고리 : 
             <input type="checkbox" id='category1' name='category' value='novel' 
             checked={selectedOptions.category.includes('novel')}
             onChange={() => handleKeywordChange('category', 'novel')}/>소설&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='category2' name='category' value='poem' 
             checked={selectedOptions.category.includes('poem')}
             onChange={() => handleKeywordChange('category', 'poem')} />시&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='category3' name='category' value='essay' 
             checked={selectedOptions.category.includes('essay')}
             onChange={() => handleKeywordChange('category', 'essay')} />에세이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             
             <input type="checkbox" id='category4' name='category' value='magazine'
             checked={selectedOptions.category.includes('magazine')}
             onChange={() => handleKeywordChange('category', 'magazine')} />잡지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             </div>

             <div>장르 : 
             <input type="checkbox" id='genre1' value='fantasy' 
              checked={selectedOptions.genre.includes('fantasy')}
              onChange={() => handleKeywordChange('genre', 'fantasy')} />판타지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='genre2' value='melo' 
             checked={selectedOptions.genre.includes('melo')}
             onChange={() => handleKeywordChange('genre', 'melo')} />멜로&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='genre3' value='detective'
             checked={selectedOptions.genre.includes('detective')}
             onChange={() => handleKeywordChange('genre', 'detective')} />추리&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

             <input type="checkbox" id='genre4' name='genre' value='sf' 
             checked={selectedOptions.genre.includes('sf')}
             onChange={() => handleKeywordChange('genre', 'sf')} />공상과학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             </div>
          </div>

          <hr />

          <div className='ProductListPage_SortOption'>
            <button onClick={handleSelectedKeywordDefault}>기본순</button>&nbsp;&nbsp;
            <button onClick={handleSelectedKeywordAscending}>최저가순</button>&nbsp;&nbsp;
            <button onClick={handleSelectedKeywordDescending}>최고가순</button>&nbsp;&nbsp;
            <button onClick={handleSelectedKeywordSellCount}>판매량순</button>&nbsp;&nbsp;
            {/* <button onClick={handleSelectedKeywordDefault}>신상품순</button>&nbsp;&nbsp; */}
            <input text='number' size={7} value={limitedMinPrice} onChange={(e)=>setLimitedMinPrice(e.target.value)}/>
            <span>~</span>
            <input text='number' size={7} value={limitedMaxPrice} onChange={(e)=>setLimitedMaxPrice(e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleSelectedKeywordLimitedPrice}>가격검색</button>
          </div>

          <div>
            <input type="text" />
          </div>
             
          <h2 className='seller_product_page_title'>하드코딩된 타이틀</h2>
        </div>

        <hr className='seller_product_page_titlebox_hr'/>

        <div className='seller_product_bookList'>
          {bookList}
        </div>
        

      </div>
      <SideButton />
    </div>

  );
};
 // ProductListPage
export default ProductListPage;