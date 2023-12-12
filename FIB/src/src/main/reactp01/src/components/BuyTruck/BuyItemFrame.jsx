import { createContext } from 'react';

const BuyItFrame = {
    items: [],
    totalAmount: 0,
    saleTotalPrice: 0,
    postItem: (item) => { },
    removeItem: (id) => { }
};

const BuyItemFrame = createContext(BuyItFrame);

export default BuyItemFrame;