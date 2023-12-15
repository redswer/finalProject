import './RecentSideBarItem.css'
import { useEffect ,useState} from 'react';
import axios from 'axios';
const RecentSideBarItem = (props) => {

    return (
        <div className='basket_preview_item_container'>
            <div className='basket_preview_item_title'>
            pcode : {props.product_code}
            </div>

            {/* <div>
            아이디 : {props.id}
            </div> */}

            <div className='basket_preview_item_price'>
            제목 : {props.title}
            </div>

            <div className='basket_preview_item_price'>
            가격 : {props.price}
            </div>

            <div className='basket_preview_item_amount'>
                
            </div>
        </div>
    );
};

export default RecentSideBarItem;