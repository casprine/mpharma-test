import { ADD_ITEM, INIT_LOAD, DELETE_ITEM, EDIT_ITEM } from '../action/products';

const initialState = {
  products: {},
};

const ACTIONS = {
  [INIT_LOAD]: (state, action) => {
    return {
      ...action.data,
      ...state,
    };
  },
  [ADD_ITEM]: (state, action) => {
    const { name, price } = action.data;
    const newProductId = Math.max(...state.products.map((p) => p.id)) + 1;
    const updatedProducts = [...state.products, { id: newProductId, name }];
    const updatedPrices = [
      ...state.prices,
      { price, date: new Date(), id: 1, productId: newProductId },
    ];
    return { ...state, products: updatedProducts, prices: updatedPrices };
  },

  [EDIT_ITEM]: (state, action) => {
    const { name, price, productId, priceId } = action.data;

    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        const updatedProduct = { ...product, name };
        return updatedProduct;
      }
      return product;
    });

    const updatedPrices = state.prices.map((p) => {
      if (p.id === priceId) {
        const updatedPrice = { ...p, price };
        return updatedPrice;
      }
      return p;
    });

    return { ...state, products: updatedProducts, prices: updatedPrices };
  },

  [DELETE_ITEM]: (state, action) => {
    const { productId } = action.data;

    const updatedProducts = state.products.filter((product) => product.id !== productId);

    return {
      ...state,
      products: updatedProducts,
    };
  },
};

export default function authReducer(state = initialState, action) {
  const handler = ACTIONS[action.type];
  return handler ? handler(state, action) : state;
}
