import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import productListReducer from '../reducers/productListReducer';
import {
  SET_PRODUCTS,
  SORT_PRODUCTS_BY_CATEGORIES
} from '../constants/products';

// this customhooks manage the logic of my productList and give us acces to the function to add to remove
const useProductList = () => {
  const [state, dispatch] = useReducer(productListReducer, {
    products: [],
    sortedProducts: []
  });
  const productsIsempty = state.products.length === 0 ? true : false;
  const { REACT_APP_API_DOMAIN, REACT_APP_API_PRODUCT } = process.env;
  const getProducts = useCallback((products) => {
    return dispatch({
      type: SET_PRODUCTS,
      products,
      sortedProducts: products
    });
  }, []);

  const getAllProducts = async () => {
    const res = await axios
      .get(REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT).catch(err => console.log(err))
    res && res.data && getProducts(res.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //this function is related to the type of action dispacth either sort by higher or lowest
  const sortProducts = useCallback((type) => {
    return dispatch({
      type: type
    });
  }, []);

  const sortProductsByCategories = useCallback((categories) => {
    return dispatch({
      type: SORT_PRODUCTS_BY_CATEGORIES,
      categories
    });
  }, []);

  //when the products list is empty i set a orignal product, its because when the select is empy i need to set the initail state
  useEffect(() => {
    getAllProducts();
  }, [productsIsempty]);

  return {
    state,
    getProducts,
    sortProducts,
    sortProductsByCategories,
    getAllProducts
  };
};

export default useProductList;
