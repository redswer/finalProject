import './ProductListPage.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import ProductListItem from './ProductListItem';
import RecentSideBar from './UiBox/RecentSideBar';
import KeywordSideBar from './UiBox/KeywordSideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
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
  
  const [productData, setProductData] = useState([]);

  const [limitedMinPrice , setLimitedMinPrice] = useState(0);
  const [limitedMaxPrice , setLimitedMaxPrice] = useState(0);

  const [titleWord , setTitleWord] = useState(`국내도서 > 전체 카테고리 > 전체 장르`);

  const [getMapping , setGetMapping] = useState('productSelectedList2');

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

        // // const prevSearchParams = new URLSearchParams(urlString.search);

        // const newURL = `/ProductListPage?${prevSearchParams.toString()}`;

        // // if (urlString.search !== `?${prevSearchParams.toString()}`) {
        //   // urlNavigate(newURL);
        // // }
        // urlNavigate(newURL);

        // //==============================

        }
      }).catch((err) => {
        alert(`requestToServer 서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(()=> {
    
    urlNavigate
    (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    requestToServer
    (`/product/${getMapping}?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)

  },[])

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

const generateTitleWord = () => {
  const domesticOptions = {
    '0': '전체 국가',
    '1': '국내',
    '2': '영/미',
    '3': '프랑스',
    '4': '독일',
    // 추가적인 국가에 대한 옵션도 필요하다면 이어서 계속 작성
  };

  const categoryOptions = {
    '0': '전체 카테고리',
    'novel': '소설',
    'poem': '시',
    'essay': '에세이',
    'magazine': '잡지',
    // 추가적인 카테고리에 대한 옵션도 필요하다면 이어서 계속 작성
  };

  const genreOptions = {
    '0': '전체 장르',
    'fantasy': '판타지',
    'melo': '멜로',
    'detective': '추리',
    'sf': '공상과학',
    // 추가적인 장르에 대한 옵션도 필요하다면 이어서 계속 작성
  };

  const domestic = domesticOptions[selectedOptions.domestic] || '해외';
  const category = categoryOptions[selectedOptions.category] || '기타 분류';
  const genre = genreOptions[selectedOptions.genre] || '기타 장르';

  setTitleWord(`${domestic} > ${category} > ${genre}`);

};

//============================================================================================================================
const keywordSortTitle = () => { // 1.제목순

  // 선택된 옵션들을 이용하여 파라미터를 생성합니다.

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  setGetMapping('productSelectedList2');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productSelectedList2?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    generateTitleWord();

  } else {
    requestToServer
    (`/product/productSelectedList2?domestic=${nowParams.get('domestic')}&category=${nowParams.get('category')}&genre=${nowParams.get('genre')}`)
    console.log(`nowParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`현재 파람 값으로 기본순 재검색합니다 ^~^`);
  }

};

//============================================================================================================================
    
const keywordSortPriceAsc = () => {   // 2.최저가
  setGetMapping('productAscendingList');
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productAscendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    generateTitleWord();

  } else {
    requestToServer
    (`/product/productAscendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
    alert(`현재 파람 값으로 최저가순 재검색합니다 ^~^`);
  }

}

//============================================================================================================================

const keywordSortPriceDesc = () => {   // 3.최고가
  setGetMapping('productDescendingList');
  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
  const nowParams = new URLSearchParams(urlString.search);
  if (isOptionSelected) {
    requestToServer
    (`/product/productDescendingList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    generateTitleWord();

  } else {
    requestToServer
    (`/product/productDescendingList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
    urlNavigate
    (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${selectedOptions.genre}`);
    alert(`현재 파람 값으로 최고가순 재검색합니다 ^~^`);
  }

}

//============================================================================================================================

  const keywordSortSellCount = () => {   // 4.판매량
    setGetMapping('productSellCountList');

    const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');
    const nowParams = new URLSearchParams(urlString.search);
    if (isOptionSelected) {
      requestToServer
      (`/product/productSellCountList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
  
      urlNavigate
      (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

      generateTitleWord();

      alert(`판매량순으로 상품 검색합니다 ^~^`);

    } else {
      requestToServer
      (`/product/productSellCountList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}`)
      urlNavigate
      (`/ProductListPage?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${selectedOptions.genre}`);
      alert(`현재 파람 값으로 판매량순 재검색합니다 ^~^`);
    }

    

  }
//============================================================================================================================

const keywordSortGradeAvg = () => {   // 5.평점순
  setGetMapping('productGradeAvgList');

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productGradeAvgList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    alert(`별점이 높은 순으로 상품 검색합니다 ^~^`);

  } else {
    requestToServer
    (`/product/productGradeAvgList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)
    console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`현재 파람 값으로 별점순 상품 재검색합니다 ^~^`);
  }

}

//============================================================================================================================

const keywordSortViewCount = () => {   // 6.리뷰순
  setGetMapping('productViewCountList');

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productViewCountList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
    
    alert(`리뷰많은 제품순으로 검색합니다 ^~^`);

  } else {
    requestToServer
    (`/product/productViewCountList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)
    console.log(`nomParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`현재 파람 값으로 리뷰순 상품 재검색합니다 ^~^`);
  }

}



//============================================================================================================================

const keywordLimitedPrice = () => {   // 7.제한가격검색
  setGetMapping('productLimitedPriceList');

  const nowParams = new URLSearchParams(urlString.search);

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);

    alert(`${limitedMinPrice}원 부터 ${limitedMaxPrice}원 까지의 상품 검색합니다 ^~^`);

  } else {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice=${limitedMaxPrice}`)
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
    (`/product/searchTextWord?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}&minprice=${limitedMinPrice}&maxprice${limitedMaxPrice}&textword=${textWordValue}`);

    urlNavigate
    (`/ProductListPage?domestic=${selectedOptions.domestic}&category=${selectedOptions.category}&genre=${selectedOptions.genre}`);
    alert(`해당 검색어로 상품 출력하려고 합니다 ^~^!`);

  } else {
    requestToServer
    (`/product/productLimitedPriceList?domestic=${urlParams.get('domestic')}&category=${urlParams.get('category')}&genre=${urlParams.get('genre')}&minprice=${limitedMinPrice}&maxprice${limitedMaxPrice}&textword=${textWordValue}`)
    // console.log(`nowParam : ` ,nowParams.get('domestic') , nowParams.get('category') , nowParams.get('genre'))
    alert(`검색어를 입력해주세용 ^~^`);
  }
  
}
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

              <select onChange={handlePageSizeChange} value={size}>
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
            <button onClick={keywordSortTitle}>제목순</button>&nbsp;&nbsp;
            <button onClick={keywordSortPriceAsc}>최저가순</button>&nbsp;&nbsp;
            <button onClick={keywordSortPriceDesc}>최고가순</button>&nbsp;&nbsp;
            <button onClick={keywordSortSellCount}>판매량순</button>&nbsp;&nbsp;
            <button onClick={keywordSortGradeAvg}>평점순</button>&nbsp;&nbsp;
            <button onClick={keywordSortViewCount}>리뷰순</button>&nbsp;&nbsp;
            
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
             
          <h2 className='seller_product_page_title'>{titleWord}</h2>
        </div>

        <hr className='seller_product_page_titlebox_hr'/>

        <div className='seller_product_bookList'>
          {/* {viewedList} */}
          {/* {booklist} */}

          {viewedList.map((d, i) => (
            <ProductListItem
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
 // ProductListPage
export default ProductListPage;