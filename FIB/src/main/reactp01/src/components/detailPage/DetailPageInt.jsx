import { useEffect } from 'react';
import './DetailPageInt.css';

function DetailPageInt({ oneProductWriterJoin }) {

    const { intro_image, content, writer, introduction } = oneProductWriterJoin;

    useEffect(() => {
        document.getElementById('int_contents_R').innerHTML = content;
    }, [oneProductWriterJoin]);



    return (
        <div className="int">
            <div className="int_int d-flex">
                <div className="int_int_L">상품소개</div>
                <div className="int_int_R">
                    <img src={`../img/${intro_image}`} />
                </div>
            </div>

            <hr className='DetailPage_line' />

            <div className="int_contents" style={{ display: content ? 'flex' : 'none' }}>
                <div className="int_contents_L">목차</div>
                <div className="int_contents_R" id="int_contents_R"></div>
            </div>
        </div>
    );
}

export default DetailPageInt;