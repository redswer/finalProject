import BuyPageCard from './BuyPageCard';
import { useContext } from 'react';
import BuyItemFrame from './BuyItemFrame';

function BuyPage() {
    const buyitem = useContext(BuyItemFrame);
    // console.log(props);

    const totalAmount = +buyitem.totalAmount;
    const saleTotalPrice = +buyitem.saleTotalPrice;

    // const 

    const cartItemRemoveHandler = (id) => {
        buyitem.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        buyitem.postItem({ ...item, amount: 1 });
    };


    const payList = (
        <div >
            {buyitem.items.map((item) => (
                <BuyPageCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    writer={item.writer}
                    amount={item.amount}
                    type={item.type}
                    image={item.image}
                    intro_image={item.intro_image}
                    publisher={item.publisher}
                    publishDate={item.publishDate}
                    compiler={item.compiler}
                    from={item.from}
                    category={item.category}
                    salePer={item.salePer}
                    salesRate={item.salesRate}
                    salePrice={item.salePrice}
                    rank={item.rank}
                    summary={item.summary}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}

                />
            ))}
        </div>
    );

    return (
        <>

            <div className='PaymentPage'>
                {payList}
                <div>{totalAmount}</div>
                <div>{saleTotalPrice}</div>

            </div>
        </>
    );




}

export default BuyPage;