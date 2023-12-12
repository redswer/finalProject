import './DetailPage.css';
import DetailPageBook from './DetailPageBook';
import DetailPageInt from './DetailPageInt';
import DetailPageReview from './DetailPageReview';
import DetailPageRe from './DetailPageRe';
import SideButton from '../SideButton';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DetailPage() {
    const { id } = useParams();

    const [oneProductWriterJoin, setOneProductWriterJoin] = useState('');

    useEffect(() => {
        axios.get(`/product/productSelectOne?productOneParam=${id}`)
            .then((response) => {
                setOneProductWriterJoin(response.data);
                console.log('reviewList 성공');
            }).catch((err) => {
                console.log(`reviewList 실패 : ${err.message}`);
            });
    }, []);

    return (
        <div className='detailPage'>
            <DetailPageBook oneProductWriterJoin={oneProductWriterJoin} />
            <hr className='DetailPage_line' />
            <DetailPageInt oneProductWriterJoin={oneProductWriterJoin} />
            <hr className='DetailPage_line' />
            <DetailPageReview oneProductWriterJoin={oneProductWriterJoin} />
            <hr className='DetailPage_line' />
            <DetailPageRe />
            <SideButton />
        </div>
    );
}

export default DetailPage;