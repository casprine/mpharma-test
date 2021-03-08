import { ADD_ITEM, INIT_LOAD, DELETE_ITEM, EDIT_ITEM } from '../action/products';

const initialState = {
  products: {},
};

const ACTIONS = {
  [INIT_LOAD]: (state, action) => {
    return { ...state, ...action.data };
  },
  [ADD_ITEM]: (state, action) => {
    const { name, price } = action.data;

    console.log({ name, price, action });

    return { ...state };

    const newProductId = Math.max(...state.products.map((p) => p.id)) + 1;
    const updatedProducts = [...state.products, { id: newProductId, name }];
    const updatedPrices = [
      ...state.prices,
      { price, date: new Date(), id: 1, productId: newProductId },
    ];
    return { ...state, products: updatedProducts, prices: updatedPrices };
  },
};

export default function authReducer(state = initialState, action) {
  const handler = ACTIONS[action.type];
  return handler ? handler(state, action) : state;
}
