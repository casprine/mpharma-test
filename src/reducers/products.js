import { ADD_ITEM, INIT_LOAD, DELETE_ITEM, EDIT_ITEM } from '../action/products';

const initialState = {
  products: {},
};

const ACTIONS = {
  [ADD_ITEM]: (state, action) => {
    console.log({ state, action });

    return { ...state };
  },
};

export default function authReducer(state = initialState, action) {
  const handler = ACTIONS[action.type];
  return handler ? handler(state, action) : state;
}
