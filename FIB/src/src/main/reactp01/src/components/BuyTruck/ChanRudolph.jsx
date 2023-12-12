import { useReducer } from 'react';
import ChanFrame from './ChanFrame';
import { useContext } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    saleTotalPrice: 0,
};


const cartReducer = (state, action) => {
    if (action.type === 'ADD') {  // 상품 추가 했을때

        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const updatedsaleTotalPrice =
            state.saleTotalPrice + action.item.salePrice * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];

            updatedItems[existingCartItemIndex] = updatedItem;

        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            saleTotalPrice: updatedsaleTotalPrice,
        };
    }

    return defaultCartState;
};

const BasketRudolph = (props) => {
    const [ChanState, dispatch] = useReducer(cartReducer, defaultChanState);

    const postInfoHandler = (item) => {
        dispatch({ type: 'ADD', item: item });
        console.log(item);
    };


    const baskee = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        saleTotalPrice: cartState.saleTotalPrice,
        postInfo: addItemToCartHandler,
    };

    return (
        <ChanFrame.Provider value={baskee}>
            {props.children}
        </ChanFrame.Provider>
    );
};

export default BasketRudolph;
