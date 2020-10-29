import { useCallback, useReducer, useState } from "react";
import basketReducer from "../reducers/basketReducer";

import {
  ADD_PRODUCT_TO_BASKET,
  DECREASE_PRODUCT_FROM_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  DECREASE_PRODUCTS_FROM_BASKET,
  REMOVE_ALL_PRODUCTS_FROM_BASKET,
} from "../constants/basket";
import ProductInBasket from "../components/product/ProductInBasket";

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useBasket = () => {
  const [userBasket, dispatch] = useReducer(basketReducer, []);
  const [notification, addNotification] = useState(false);

  const renderNotification = useCallback(
    (product) => {
      if (product && ProductInBasket({ product }) > 0 && notification.add) {
        return `+${notification.num}`;
      } else if (notification && notification.remove) {
        return `-${notification.num}`;
      } else {
        return 0;
      }
    },
    [notification]
  );

  const addProductTobasket = useCallback((product, num) => {
    return dispatch({
      type: ADD_PRODUCT_TO_BASKET,
      product,
      num,
    });
  }, []);

  const decreaseProductFromBasket = useCallback((product, num) => {
    return dispatch({
      type: DECREASE_PRODUCT_FROM_BASKET,
      product,
      num,
    });
  }, []);
  const decreaseProductsFromBasket = useCallback((product, number) => {
    return dispatch({
      type: DECREASE_PRODUCTS_FROM_BASKET,
      product,
      number,
    });
  }, []);
  const removeAllProductsFromBasket = useCallback(() => {
    return dispatch({
      type: REMOVE_ALL_PRODUCTS_FROM_BASKET,
    });
  }, []);
  const removeProductFromBasket = useCallback((product) => {
    return dispatch({
      type: REMOVE_PRODUCT_FROM_BASKET,
      product,
    });
  }, []);

  return {
    addProductTobasket,
    userBasket,
    decreaseProductFromBasket,
    removeAllProductsFromBasket,
    removeProductFromBasket,
    decreaseProductsFromBasket,
    renderNotification,
    addNotification,
    notification,
  };
};

export default useBasket;
