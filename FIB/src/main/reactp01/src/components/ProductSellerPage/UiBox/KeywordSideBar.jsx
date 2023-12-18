import './KeywordSideBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function KeywordSideBar(props) {
    const [domesticParam, setDomesticParam] = useState(0);
    const urlNavigate = useNavigate();

    const [urlString, setUrlString] = useState(useLocation());
    const urlParams = new URLSearchParams(urlString.search);


    const getProductList = (domesticValue, categoryValue, genreValue) => {
        const query = `domestic=${domesticValue}&category=${categoryValue}&genre=${genreValue}`;
        props.requestFromBarToServer(`/product/productSelectedList2?${query}`);
        urlNavigate(`/ProductListPage?${query}`);
        window.location.reload();
    };



    const selectOptions = (domesticValue, categoryValue, genreValue) => {
        return () => getProductList(domesticValue, categoryValue, genreValue);
    };

    const korea = selectOptions(1, 0, 0);
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
        <div className='KeywordSideBarContainer'>
            <div className='KeywordDomesticDiv'>
                <div className='KeywordDomesticStandard'>국가별</div>

                <button onClick={korea}>국내도서</button>

                <button onClick={english}>영/미도서</button>

                <button onClick={france}>프랑스도서</button>

                <button onClick={germany}>독일도서</button>

            </div>

            <div className='KeywordCategoryDiv'>
                <div className='KeywordCategoryStandard'>카테고리</div>
                <button onClick={novel}>소설</button>

                <button onClick={poem}>시</button>

                <button onClick={essay}>에세이</button>

                <button onClick={magazine}>잡지</button>
            </div>


            <div className='KeywordGenreDiv'>
                <div className='KeywordGenreStandard'>장르</div>
                <button onClick={fantasy}>판타지</button>

                <button onClick={melo}>멜로</button>

                <button onClick={detective}>추리</button>

                <button onClick={sf}>공상과학</button>
            </div>



        </div>
    );
}
export default KeywordSideBar;