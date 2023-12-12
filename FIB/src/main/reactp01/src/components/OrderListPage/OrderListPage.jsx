import './OrderListPage.css';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import OrderListProductCard from './OrderListProductCard';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


// 임시로 쓰는 그..뭐냐...제품상세페이지임 ㅇㅇ.

function OrderListPage() {
    const loginID = sessionStorage.getItem("loginID");

    const [bookData, setBookData] = useState({});

    const [cookieBox,setCookieBox] = useState();

    const [proCode,setProCode] = useState(11);

    function plus() {
        setProCode(proCode+1);
    }

    function minus() {
        setProCode(proCode-1);
    }

    //=======================================================================================

    useEffect(() => {
        axios.get(`/product/productSelectOne?productOneParam=${proCode}`)
            .then((response) => {
                setBookData(response.data);
                console.log('북데이터 처음 가져오기 성공');
            }).catch((err) => {
                console.log(`이런이런 실패 : ${err.message}`);
            });

        
        axios.get(`/product/recentView?pcode=${proCode}`)
        .then((response) => {
            setBookData(response.data);
            console.log('최근 방문 상품 목록 저장 성공');
        }).catch((err) => {
            console.log(`이런이런 실패 : ${err.message}`);
        });
            
    }, []);


    useEffect(() => {
        axios.get(`/product/productSelectOne?productOneParam=${proCode}`)
            .then((response) => {
                setBookData(response.data);
                console.log('북데이터 다시가져오기 성공');
            }).catch((err) => {
                console.log(`이런이런 실패 : ${err.message}`);
            });

        axios.get(`/product/recentView?pcode=${proCode}`)
        .then((response) => {
            setBookData(response.data);
            console.log('최근 방문 상품 목록에 다시 저장 성공');
        }).catch((err) => {
            console.log(`이런이런 실패 : ${err.message}`);
        });

    }, [proCode]);

//=======================================================================================

    console.log(`임시 상세페이지 bookData 왔수? : ` ,bookData);
    // console.log(`임시 상세페이지 product_code : `,bookData.product_code);

    //=======================================================================================

        return (
        <div className='detailPage'>
            <hr />
            <hr />
            {/* <button onClick={makeRecentList}>이 정보에 맞는 쿠키를 구워줄래?</button> */}
            <hr />
            <hr />
            <button onClick={minus}>-- minus</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{proCode}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={plus}>plus ++</button>
            <hr />
            <hr />
            <div>id : {loginID === null ? '아이디없다' : loginID}</div>
            <hr />
            <div>product_code :{bookData.product_code} </div>
            <hr />
            <div>url : </div>
            <hr />
            <div>product_code : {bookData.title} </div>
            <hr />
            <div>price : {bookData.price} </div>
            <hr />
            <div>domestic : {bookData.domestic} </div>
            <hr />
            <div>category :{bookData.category} </div>
            <hr />

            <div>
                <span>최근 본 상품</span>
            </div>
            
            {/* <OrderListProductCard bookData={bookData} /> */}
        </div>
    );
}

export default OrderListPage;