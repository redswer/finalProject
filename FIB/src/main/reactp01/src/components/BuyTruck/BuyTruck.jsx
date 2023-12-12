import { useReducer } from 'react';
import BuyItemFrame from './BuyItemFrame';
// import { useContext } from 'react';

const defaultpayBoxState = {
    items: [],
    totalAmount: 0,
    saleTotalPrice: 0,
};

const payBoxReducer = (state, action) => {
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

    if (action.type === 'REMOVE') {  // 상품 지울때,
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        const updatedsaleTotalPrice = state.saleTotalPrice - existingItem.salePrice;

        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: 0 };
            //existingItem.amount - 1
            updatedItems = [...state.items];

            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            saleTotalPrice: updatedsaleTotalPrice,
        };
    }

    return defaultpayBoxState;
};

const BuyTruck = (props) => {
    const [payBoxState, dispatchPayBoxAction] = useReducer(payBoxReducer, defaultpayBoxState);

    const postItemToPaymentHandler = (item) => {
        dispatchPayBoxAction({ type: 'ADD', item: item });
    };

    const cancelItemInBoxHandler = (id) => {
        dispatchPayBoxAction({ type: 'CANCEL', id: id });
    };

    const gogoPayItem = {
        items: payBoxState.items,
        totalAmount: payBoxState.totalAmount,
        saleTotalPrice: payBoxState.saleTotalPrice,
        postItem: postItemToPaymentHandler,
        cancelItem: cancelItemInBoxHandler,
    };

    return (
        <BuyItemFrame.Provider value={gogoPayItem}>
            {props.children}
        </BuyItemFrame.Provider>
    );
};

export default BuyTruck;
