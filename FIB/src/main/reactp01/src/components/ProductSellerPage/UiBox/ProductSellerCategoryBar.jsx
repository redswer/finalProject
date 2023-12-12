import './ProductSellerCategoryBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ProductSellerCategoryBar(props) {
    const [domesticParam, setDomesticParam] = useState(0);
    const urlNavigate = useNavigate();

    const [urlString , setUrlString] = useState(useLocation());
    const urlParams = new URLSearchParams(urlString.search);
    
const domestic = () => {
    props.requestFromBarToServer
    (`/product/productSelectedList?domestic=1&category=0&genre=0`);
    urlNavigate
    (`/ProductListPage?domestic=1&category=0&genre=0`);

    window.location.reload();
  };

  const english = () => {
    props.requestFromBarToServer
    (`/product/productSelectedList?domestic=2&category=0&genre=0`);
    urlNavigate
    (`/ProductListPage?domestic=2&category=0&genre=0`);
    window.location.reload();
  };

  const france = () => {
    props.requestFromBarToServer
    (`/product/productSelectedList?domestic=3&category=0&genre=0`);
    urlNavigate
    (`/ProductListPage?domestic=3&category=0&genre=0`);
    window.location.reload();
  };

  const germany = () => {
    props.requestFromBarToServer
    (`/product/productSelectedList?domestic=4&category=0&genre=0`);
    urlNavigate
    (`/ProductListPage?domestic=4&category=0&genre=0`);
    window.location.reload();
  };

  

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
            </div>


            <div className='ProductSellerCategoryBar_h5'>
                <div>장르</div>
            </div>



        </div>
    );
}
export default ProductSellerCategoryBar;