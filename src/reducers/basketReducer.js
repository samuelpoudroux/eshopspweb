import {
  ADD_PRODUCT_TO_BASKET,
  DECREASE_PRODUCT_FROM_BASKET,
  DECREASE_PRODUCTS_FROM_BASKET,
  REMOVE_ALL_PRODUCTS_FROM_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  ADD_ALL_FAVORITES_TO_BASKET,
} from "../constants/basket.js";

import {
  addProductToBasket,
  decreaseProductFromBasket,
  decreaseProductsFromBasket,
  removeAllProductsFromBasket,
  removeProductFromBasket,
  addAllFavoritesToBasket,
} from "../repository/basket";

const basketreducer = (currentBasket, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return addProductToBasket(currentBasket, action);
    case DECREASE_PRODUCT_FROM_BASKET:
      return decreaseProductFromBasket(currentBasket, action);
    case REMOVE_ALL_PRODUCTS_FROM_BASKET:
      return removeAllProductsFromBasket(currentBasket, action);
    case REMOVE_PRODUCT_FROM_BASKET:
      return removeProductFromBasket(currentBasket, action);
    case DECREASE_PRODUCTS_FROM_BASKET:
      return decreaseProductsFromBasket(currentBasket, action);
    case ADD_ALL_FAVORITES_TO_BASKET:
      return addAllFavoritesToBasket(currentBasket, action);
    default:
      break;
  }
};
export default basketreducer;
