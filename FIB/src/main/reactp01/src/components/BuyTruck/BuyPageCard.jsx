import './BuyPageCard.css';
import BuyItemFrame from './BuyItemFrame';
import { useContext } from 'react';

function BuyPageCard(props) {
    const payBoxframe = useContext(BuyItemFrame);

    const salePrice = ((props.price * (100 - props.salePer)) / 100);

    const addToCartHandler = amount => {
        payBoxframe.postItem({
            id: props.id,
            title: props.title,
            amount: amount,
            price: props.price,
            type: props.type,
            from: props.from,
            category: props.category,
            key: props.id,
            writer: props.writer,
            type: props.type,
            image: props.image,
            salePer: props.salePer,
            salesRate: props.salesRate,
            salePrice: ((props.price * (100 - props.salePer)) / 100),
        });
    };

    return (
        <div className='buypagecard'>

            <div>{props.title}</div>
            <div>{props.amount}</div>
            <div>{props.salePrice}</div>
            <div>{props.type}</div>
        </div>
    );
}

export default BuyPageCard;