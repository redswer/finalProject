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
   const [pageThemeDomestic , setPageThemeDomestic] = useState();
  const [pageThemeCategory , setPageThemeCategory] = useState();
  const [pageThemeGenre , setPageThemeGenre] = useState();
  const [limitedMinPrice , setLimitedMinPrice] = useState(0);
  const [limitedMaxPrice , setLimitedMaxPrice] = useState(0);
  const [titleWord , setTitleWord] = useState();
  const [resultDTO , setResultDTO] = useState({});
  const [getMapping , setGetMapping] = useState('productSelectedList2');

  const [nowPage,setNowPage] =useState(1);
  const [nowSize , setNowSize] = useState(3);

  const [valueOfLimitedPrice,setValueOfLimitedPrice] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  //==========================================================================================================================
  const requestToServer = (initRequestURL) => {
    

    axios
      .get(`${initRequestURL}`)
      .then((response) => {
        const prevSearchParams = new URLSearchParams(urlString.search);
        console.log(`response 성공 :`, response);
        // console.log(`fetchData-response.data[0] : `, response.data[0]);
        console.log('========================================');
        if (response.data && response.data.entityList.length > 0) {

          setResultDTO(response.data);
          setProductData(response.data.entityList);
          // alert(`setResultDTO 성공 : `,response.data.entityList);
          console.log(`setResultDTO 성공 : `,response.data.entityList);
  

        } else {
        console.log(`requestToServer : 조건에 해당하는 도서가 없습니다.`);
        console.log(`resposne data : `, response.data);

        alert(`requestToServer : 조건에 해당하는 도서가 없습니다.`);

        // const prevSearchParams = new URLSearchParams(urlString.search);

        const newURL = `/ProductListPage?${prevSearchParams.toString()}`;

        // if (urlString.search !== `?${prevSearchParams.toString()}`) {
          // urlNavigate(newURL);
        // }
        urlNavigate(newURL);

        //==============================

        }
      })
      .catch((err) => {
        alert(`requestToServer 서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(()=> {
    
    urlNavigate
    (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=${nowPage}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    requestToServer
    (`/product/${getMapping}?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=${nowPage}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)

  },[])


  console.log(`setResultDTO : ` , resultDTO);

  
//===========================================================================================================================

const [selectedOptions, setSelectedOptions] = useState(
{
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
const keywordSortTitle = () => {
  // 선택된 옵션들을 이용하여 파라미터를 생성합니다.

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  setGetMapping('productSelectedList2');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productSelectedList2?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);

  } else {
    // alert(`이런이런, 카테고리부터 선택하라구 Boy↗↘♬ ^-^  ~0~`);
    requestToServer
    (`/product/productSelectedList2?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}&page=1&size=${nowSize}`)
    console.log(`nowParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`현재 파람 값으로 기본순 재검색합니다 ^~^`);
  }
  
};

//============================================================================================================================
    
const keywordSortPriceAsc = () => {   // 최저가
  setGetMapping('productAscendingList');
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productAscendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);
  } else {
    // fetchData(`/product/productAscendingList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`);
    // alert(`이런이런 카테고리를 선택해주세용 ^-^  ~0~`);
    requestToServer
    (`/product/productAscendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}`)
    alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }
}

//============================================================================================================================



const keywordSortPriceDesc = () => {   // 최고가
  setValueOfLimitedPrice(1);
  setGetMapping('productDescendingList');
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productDescendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);
  } else {
    // fetchData(`/product/productAscendingList?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`);
    // alert(`이런이런 카테고리를 선택해주세용 ^-^  ~0~`);
    requestToServer
    (`/product/productDescendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}`)
    urlNavigate
    (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);
    alert(`현재 파람 값으로 최고가순 재검색합니다 ^~^`);
  }
}

//============================================================================================================================

const keywordLimitedPrice = () => {   // 가격제한된
  setGetMapping('productLimitedPriceList');

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);
    alert(`${limitedMinPrice}원 부터 ${limitedMaxPrice}원 까지의 상품 검색합니다 ^~^`);

  } else {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)
    console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`현재 파람 값으로 ${limitedMinPrice}원 부터 ${limitedMaxPrice}원 까지의 상품 재검색합니다 ^~^`);
  }
  
}
//============================================================================================================================
const [textWordValue,setTextWordValue] = useState('');


const searchTextWord = () => {  
  setGetMapping('searchTextWord');

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/searchTextWord?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice${limitedMaxPrice}&textword=${textWordValue}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}`);
    alert(`해당 검색어로 상품 출력하려고 합니다 ^~^!`);

  } else {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice${limitedMaxPrice}&textword=${textWordValue}`)
    // console.log(`nowParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`검색어를 입력해주세용 ^~^`);
  }
  
}
//============================================================================================================================


const movePage = (page) => {
  const lastPage = resultDTO.pageList ? resultDTO.pageList[resultDTO.pageList.length - 1] : 1;

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  if (page > 0 && page <= lastPage) {
    setSelectedPage(page);

    const nowParams = new URLSearchParams(urlString.search);


    if (isOptionSelected) {
      requestToServer
      (`/product/${getMapping}?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=${page}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

      urlNavigate
      (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=${page}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    } else {

      urlNavigate
      (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=${page}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

      requestToServer
      (`/product/${getMapping}?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=${page}&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)

      console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
      alert(`페이지 이동해유 ^~^`);
    }
  }

  // window.location.reload();
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
  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  if (isOptionSelected) {
    requestToServer
    (`/product/${getMapping}?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

  } else {

    urlNavigate
    (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    requestToServer
    (`/product/${getMapping}?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&page=1&size=${nowSize}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)

    console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    // alert(`사이즈변경으로 리로링 ^~^`);
  }

  // window.location.reload();
},[nowSize])

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
             <h3>키워드 선택</h3>

              <select onChange={handleSelectChange} value={nowSize}>
                <option value="2">2개씩 보기</option>
                <option value="3">3개씩 보기</option>
                <option value="5">5개씩 보기</option>
                <option value="7">7개씩 보기</option>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
              </select>

              <hr />

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
            <button onClick={keywordSortTitle}>기본순</button>&nbsp;&nbsp;
            <button onClick={keywordSortPriceAsc}>최저가순</button>&nbsp;&nbsp;
            <button onClick={keywordSortPriceDesc}>최고가순</button>&nbsp;&nbsp;
            <button onClick={keywordLimitedPrice}>판매량순</button>&nbsp;&nbsp;
            {/* <button onClick={handleSelectedKeywordDefault}>신상품순</button>&nbsp;&nbsp; */}
            <input text='number' size={7} value={limitedMinPrice} onChange={(e)=>setLimitedMinPrice(e.target.value)}/>
            <span>~</span>
            <input text='number' size={7} value={limitedMaxPrice} onChange={(e)=>setLimitedMaxPrice(e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={keywordLimitedPrice}>가격검색</button>
          </div>

          <hr />

          <div>
            <input type="text" value={textWordValue} onChange={(e)=>setTextWordValue(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={searchTextWord}>검색하기</button>
          </div>
             
          <h2 className='seller_product_page_title'>도서</h2>
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
export default ProductListPage;