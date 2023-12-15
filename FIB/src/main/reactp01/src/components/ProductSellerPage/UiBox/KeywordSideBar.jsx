import './KeywordSideBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function KeywordSideBar(props) {
    const [domesticParam, setDomesticParam] = useState(0);
    const urlNavigate = useNavigate();

    const [urlString , setUrlString] = useState(useLocation());
    const urlParams = new URLSearchParams(urlString.search);
    
// const domestic = () => {
//     props.requestFromBarToServer
//     (`/product/productSelectedList?domestic=1&category=0&genre=0`);
//     urlNavigate
//     (`/ProductListPage?domestic=1&category=0&genre=0`);

//     window.location.reload();
//   };

//   const english = () => {
//     props.requestFromBarToServer
//     (`/product/productSelectedList?domestic=2&category=0&genre=0`);
//     urlNavigate
//     (`/ProductListPage?domestic=2&category=0&genre=0`);
//     window.location.reload();
//   };

//   const france = () => {
//     props.requestFromBarToServer
//     (`/product/productSelectedList?domestic=3&category=0&genre=0`);
//     urlNavigate
//     (`/ProductListPage?domestic=3&category=0&genre=0`);
//     window.location.reload();
//   };

//   const germany = () => {
//     props.requestFromBarToServer
//     (`/product/productSelectedList?domestic=4&category=0&genre=0`);
//     urlNavigate
//     (`/ProductListPage?domestic=4&category=0&genre=0`);
//     window.location.reload();
//   };

const getProductList = (domesticValue, categoryValue, genreValue) => {
    const query = `domestic=${domesticValue}&category=${categoryValue}&genre=${genreValue}&page=1&size=3`;
    props.requestFromBarToServer(`/product/productSelectedList2?${query}`);
    urlNavigate(`/ProductListPage?${query}`);
    window.location.reload();
};



const selectOptions = (domesticValue, categoryValue, genreValue) => {
    return () => getProductList(domesticValue, categoryValue, genreValue);
};

const domestic = selectOptions(1, 0, 0);
const english = selectOptions(2, 0, 0);
const france = selectOptions(3, 0, 0);
const germany = selectOptions(4, 0, 0);

const novel = selectOptions(0, 'novel', 0);
const poem = selectOptions(0, 'poem', 0);
const essay = selectOptions(0, 'essay', 0);
const magazine = selectOptions(0, 'magazine', 0);

const fantasy = selectOptions(0, 0, 'fantasy');
const melo = selectOptions(0, 0, 'melo');
const detective = selectOptions(0, 0, 'detective');
const sf = selectOptions(0, 0, 'sf');


  

        return (
        <div className='SelectKeywordSideBar_Container'>
            <div className='ProductSellerCategoryBar_h4'>
                <div>국가별 도서</div>
                <div className='product_seller_category_link_box'>
                    <button onClick={domestic}>국내도서</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={english}>영/미도서</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={france}>프랑스도서</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={germany}>독일도서</button>
                </div>

            </div>
            
            <div className='ProductSellerCategoryBar_h5'>
                <div>카테고리</div>
                <div className='product_seller_category_link_box'>
                    <button onClick={novel}>소설</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={poem}>시</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={essay}>에세이</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={magazine}>잡지</button>
                </div>
            </div>


            <div className='ProductSellerCategoryBar_h5'>
                <div>장르</div>
                <div className='product_seller_category_link_box'>
                    <button onClick={fantasy}>판타지</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={melo}>멜로</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={detective}>추리</button>
                </div>

                <div className='product_seller_category_link_box'>
                    <button onClick={sf}>공상과학</button>
                </div>
            </div>



        </div>
    );
}
export default KeywordSideBar;