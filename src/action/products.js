import { productsNormalizer } from '../utils/normalizer';

export const ADD_ITEM = 'PRODUCTS/ADD_ITEM';
export const INIT_LOAD = 'PRODUCTS/INIT_LOAD';
export const DELETE_ITEM = 'PRODUCTS/DELETE_ITEM';
export const EDIT_ITEM = 'PRODUCTS/EDIT_ITEM';

export const seed = (data) => {
  return (dispatch) => {
    const normalizedData = productsNormalizer(data);

    dispatch({
      type: INIT_LOAD,
      data: normalizedData,
    });
  };
};

export const addItem = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ITEM,
      data,
    });
  };
};

export const editItem = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_ITEM,
      data,
    });
  };
};

export const deleteItem = (data) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM,
      data,
    });
  };
};
