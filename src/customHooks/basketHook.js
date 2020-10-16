import { useReducer } from 'react';
import basketReducer from '../reducers/basketReducer';

import {
  ADD_PRODUCT_TO_BASKET,
  DECREASE_PRODUCT_FROM_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  REMOVE_ALL_PRODUCTS_FROM_BASKET
} from '../constants/basket';

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useBasket = () => {
  const [userBasket, dispatch] = useReducer(basketReducer, []);
  const addProductTobasket = (product) => {
    return dispatch({
      type: ADD_PRODUCT_TO_BASKET,
      product
    });
  };

  const decreaseProductFromBasket = (product) => {
    return dispatch({
      type: DECREASE_PRODUCT_FROM_BASKET,
      product
    });
  };
  const removeAllProductsFromBasket = () => {
    return dispatch({
      type: REMOVE_ALL_PRODUCTS_FROM_BASKET
    });
  };
  const removeProductFromBasket = (product) => {
    return dispatch({
      type: REMOVE_PRODUCT_FROM_BASKET,
      product
    });
  };

  return {
    addProductTobasket,
    userBasket,
    decreaseProductFromBasket,
    removeAllProductsFromBasket,
    removeProductFromBasket
  };
};

export default useBasket;
