import './UiBox/SellerPageCommonCSS.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import SellerProductCard from './UiBox/SellerProductCard';
import BasketPreviewBox from './UiBox/BasketPreviewBox';
import ProductSellerCategoryBar from './UiBox/ProductSellerCategoryBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  const urlString = useLocation();
  const urlParams = new URLSearchParams(urlString.search);
  
  const [firstKey , setFirstKey] = useState(`${urlParams.keys().next().value}`);
  const [firstValue , setFirstValue] = useState(`${urlParams.get(firstKey)}`);
  const [requestURL , setRequestURL] = useState();
  const [productData, setProductData] = useState([]);
  const [pageThemeDomestic , setPageThemeDomestic] = useState();
  const [pageThemeCategory , setPageThemeCategory] = useState();
  const [pageThemeGenre , setPageThemeGenre] = useState();
  const [titleWord , setTitleWord] = useState();

  console.log(`현재 urlString : ` ,urlString);
  console.log(`현재 urluseLocation() : `,useLocation());
  console.log(`현재 urlString.search : `,urlString.search);

  //==========================================================================================================================

  const fetchData = (searchParams) => {
    axios
      .get(`${searchParams}`)
      .then((response) => {
        console.log(`response 성공 :`, response);
        console.log(`response.data[0] : `, response.data[0]);
        console.log(`response.data[1] : `, response.data[1]);
        console.log('========================================');
        if (response.data && response.data.length > 0) {
          setProductData(response.data);
        } else {
          // Do not modify productData if the response is empty
        // alert('fetchData : 조건에 해당하는 도서가 없습니다.');
        }
      })
      .catch((err) => {
        alert(`서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(() => {
    fetchData(`/product/productlist?${firstKey}=${firstValue}`);
  },[firstValue]);


  useEffect(() => {
    const key = urlParams.keys().next().value;
    const value = urlParams.get(key);
  
    setFirstKey(key);
    setFirstValue(value);
    setRequestURL(`/product/productlist?${key}=${value}`);

    if(value == 1) {
      setTitleWord('국내도서');
    } 
    else if(value == '2') {
      setTitleWord('영미/도서');
    } 
    else if(value == 3) {
      setTitleWord('프랑스 도서');
    } 
    else if(value == 4) {
      setTitleWord('독일 도서');
    } 
    else if(value == 'novel') {
      setTitleWord('소설');
    } 
    else if(value == 'poem') {
      setTitleWord('시');
    } 
    else if(value == 'essay') {
      setTitleWord('에세이');
    } 
    else if(value == 'magazine') {
      setTitleWord('잡지');
    } 
    else if(value == 'fantasy') {
      setTitleWord('판타지');
    } 
    else if(value == 'melo') {
      setTitleWord('멜로');
    } 
    else if(value == 'detective') {
      setTitleWord('추리');
    } 
    else if(value == 'sf') {
      setTitleWord('공상과학');
    }

    if(requestURL) {
      fetchData(requestURL);
    }
    
  }, [urlString.search]);

console.log(productData);
console.log(productData);
// console.log(productData[0]);


//===========================================================================================================================

const [selectedOptions, setSelectedOptions] = useState({
  domestic :'0',
  category :'0',
  genre:'0'
});

const handleRadioChange = (keyword, value) => {
  setSelectedOptions((prevOptions) => ({
    ...prevOptions,
    [keyword]: prevOptions[keyword] === value ? '0' : value,
  }));
};

//============================================================================================================================

const handleSelectedKeywordLink = async () => {
  // 선택된 옵션들을 이용하여 파라미터를 생성합니다.

  const isOptionSelected = Object.values(selectedOptions).some((value) => value !== '0');

  // 선택된 옵션이 하나라도 있을 때만 서버로 요청을 보냄
  if (isOptionSelected) {
  const keywordParams = {
    domestic: selectedOptions.domestic,
    category: selectedOptions.category,
    genre: selectedOptions.genre,
  };

  setTitleWord(0);

  const domesticMapping = {
    '1': '국내도서',
    '2': '영미도서',
    '3': '프랑스도서',
    '4': '독일도서',
  };

  const categoryMapping = {
    novel: '소설',
    poem: '시',
    essay: '에세이',
    magazine: '잡지',
  };

  const genreMapping = {
    fantasy: '판타지',
    melo: '멜로',
    detective: '추리',
    sf: '공상과학',
  };

  // 변환된 값을 페이지 테마에 적용
  setPageThemeDomestic(domesticMapping[keywordParams.domestic] || '');
  setPageThemeCategory(categoryMapping[keywordParams.category] || '');
  setPageThemeGenre(genreMapping[keywordParams.genre] || '');

//   axios
//   .post(`/product/productSelectedList`,keywordParams)
//   .then((response) => {
    
//     console.log(`response 성공 :`, response);
//     console.log(`response.data[0] : `, response.data[0]);
//     console.log(`response.data[1] : `, response.data[1]);
//     console.log('========================================');
//     // alert(`선택사항 전송성공 : `, response.data.message);
    
//     setProductData(response.data);

//     const urlWithoutParams = window.location.origin + window.location.pathname;
      
//       // 페이지 이동
//       window.history.replaceState({}, '', urlWithoutParams);

//       console.log(urlWithoutParams);
    
    
//     }).catch((err) => {
//       alert(`서버연결 실패 => ${err.message}`);
//   });
// } else {
//   setProductData([]);
//   if(requestURL) {
//     fetchData(requestURL);
//   }

//   }

  try {
    const response = await axios.post(`/product/productSelectedList`, keywordParams);

    console.log(`response 성공 :`, response);
    console.log(`response.data[0] : `, response.data[0]);
    console.log(`response.data[1] : `, response.data[1]);
    console.log('========================================');

    if (response.data && response.data.length > 0) {
      setProductData(response.data);

      const urlWithoutParams = window.location.origin + window.location.pathname;

      // 페이지 이동
      window.history.replaceState({}, '', urlWithoutParams);

      console.log(urlWithoutParams);
    } else {
      // 데이터가 없는 경우에 대한 처리
      setProductData([]);
      alert('조건에 해당하는 도서 재고가 없어요..그렇다.');
    }
  } catch (err) {
    alert(`서버연결 실패 => ${err.message}`);
  }
} else {
  setProductData([]);
  if (requestURL) {
    fetchData(requestURL);
  }
}
}

//============================================================================================================================

// 페이지 타이틀을 결정하는 변수
const displayTitle = titleWord !== 0
  ? titleWord
  : 
  `${pageThemeDomestic ? `${pageThemeDomestic} ` : ''}
  ${pageThemeCategory && pageThemeDomestic ? ` : ${pageThemeCategory}` 
  : pageThemeCategory ? `${pageThemeCategory}` : ''}
  ${(pageThemeDomestic || pageThemeCategory) && pageThemeGenre ? ` : ${pageThemeGenre}` 
  : pageThemeGenre ? `${pageThemeGenre}` : ''}`;

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
  />
)); 

// stack 은 관리자만 볼 수 있음.

  return (
    <div className='seller_page_container'>
      
      

      <div className='product_seller_categorybar_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <ProductSellerCategoryBar />
      </div>

      <div className='basket_preview_box_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <BasketPreviewBox />
      </div>

      <div className='seller_product_List_container'>
        <div className='seller_product_page_titlebox'>
          <div>
             <h3>키워드 선택</h3>
             <div>국내 / 해외 : 

             <input type="checkbox" id='domestic1' name='domestic' value='1'
             checked={selectedOptions.domestic.includes('1')}
             onChange={() => handleRadioChange('domestic', '1')}/>국내

             <input type="checkbox" id='domestic2' name='domestic' value='2'
             checked={selectedOptions.domestic.includes('2')}
             onChange={() => handleRadioChange('domestic', '2')}/>영미

             <input type="checkbox" id='domestic3' name='domestic' value='3'
             checked={selectedOptions.domestic.includes('3')}
             onChange={() => handleRadioChange('domestic', '3')} />프랑스

             <input type="checkbox" id='domestic4' name='domestic' value='4'
             checked={selectedOptions.domestic.includes('4')}
             onChange={() => handleRadioChange('domestic', '4')} />독일
             </div>

             <div>카테고리 : 
             <input type="checkbox" id='category1' name='category' value='novel'
             checked={selectedOptions.category.includes('novel')}
             onChange={() => handleRadioChange('category', 'novel')}/>소설

             <input type="checkbox" id='category2' name='category' value='poem'
             checked={selectedOptions.category.includes('poem')}
             onChange={() => handleRadioChange('category', 'poem')} />시

             <input type="checkbox" id='category3' name='category' value='essay'
             checked={selectedOptions.category.includes('essay')}
             onChange={() => handleRadioChange('category', 'essay')} />에세이
             
             <input type="checkbox" id='category4' name='category' value='magazine'
             checked={selectedOptions.category.includes('magazine')}
             onChange={() => handleRadioChange('category', 'magazine')} />잡지
             </div>

             <div>장르 : 
             <input type="checkbox" id='genre1' value='fantasy'
              checked={selectedOptions.genre.includes('fantasy')}
              onChange={() => handleRadioChange('genre', 'fantasy')} />판타지

             <input type="checkbox" id='genre2' value='melo'
             checked={selectedOptions.genre.includes('melo')}
             onChange={() => handleRadioChange('genre', 'melo')} />멜로

             <input type="checkbox" id='genre3' value='detective'
             checked={selectedOptions.genre.includes('detective')}
             onChange={() => handleRadioChange('genre', 'detective')} />추리

             <input type="checkbox" id='genre4' name='genre' value='sf'
             checked={selectedOptions.genre.includes('sf')}
             onChange={() => handleRadioChange('genre', 'sf')} />공상과학
             </div>
          </div>

          <hr />

          <div>
          <button onClick={handleSelectedKeywordLink}>기본순</button>&nbsp;&nbsp;
          <button onClick={handleSelectedKeywordLink}>신상품순</button>&nbsp;&nbsp;
          <button onClick={handleSelectedKeywordLink}>판매량순</button>&nbsp;&nbsp;
          <button onClick={handleSelectedKeywordLink}>최저가순</button>&nbsp;&nbsp;
          <button onClick={handleSelectedKeywordLink}>최고가순</button>&nbsp;&nbsp;

          </div>
             
          <h2 className='seller_product_page_title'>{displayTitle}</h2>
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