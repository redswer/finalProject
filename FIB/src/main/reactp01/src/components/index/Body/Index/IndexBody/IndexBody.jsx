
import Popup from "./Popup";
import BigSlide from "./BigSlide";
import SideButton from '../../../../SideButton';
import { SlideItemBestSeller, SlideItemSteadySeller, RecommendBook, BookItem } from "./ItemSlide";
import { DivisionBestSeller, DivisionSteadySeller, DivisionRecommendBook } from "./Division";
import axios from 'axios';

function IndexBody() {
    // useEffect(() => {
    //     axios
    //         .get('/test/productList')
    //         .then((response) => {
    //             setProductList(response.data);  // 검색결과를 꺼내기위한 엄마데이터리스트
    //             setFilteredProductList(response.data) // 검색결과를 담아줄 바구니 
    //             // 단, 공지사항 화면 랜더링시 모든 리스트가 보여야 하므로 response.data를 담아줌
    //             console.log(`** checkdata 서버연결 성공 =>`, response.data);
    //         }).catch((err) => {
    //             alert(`** checkdata 서버연결 실패 => ${err.message}`);
    //         });
    // }, []); // useEffect
    
    return (
        <div className="index_body">
            {/* 구현되있으나 수정필요.. */}
            {/* <Popup></Popup> */}
            <BigSlide />

            <DivisionBestSeller />
            <SlideItemBestSeller />

            <DivisionSteadySeller />
            <SlideItemSteadySeller />

            <DivisionRecommendBook />
            <RecommendBook />

            <BookItem />

            <SideButton />
        </div>
    );
}

export default IndexBody;
