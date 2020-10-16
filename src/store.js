import React from 'react';
import useBasket from './customHooks/basketHook';
import useProductList from './customHooks/productListHook';
import useGlobalSearchResult from './customHooks/globalSearchHook';
import { AppContext } from './context/context';
import useAuth from './customHooks/authHook';

// the global store we give acces to our hooks to all appplication by this global store through appcontext provider
const GlobalStore = ({ children }) => {
  const {
    userBasket,
    addProductTobasket,
    decreaseProductFromBasket,
    removeAllProductsFromBasket,
    removeProductFromBasket,
    setActive
  } = useBasket();
  const {
    state,
    getProducts,
    sortProducts,
    sortProductsByCategories
  } = useProductList();
  const { globalSearch, search } = useGlobalSearchResult();
  const { auth, login, logout, register } = useAuth();
  const store = {
    basket: {
      list: userBasket,
      add: addProductTobasket,
      decrease: decreaseProductFromBasket,
      removeAllProducts: removeAllProductsFromBasket,
      removeProductFromBasket: removeProductFromBasket,
      setActive: setActive
    },
    products: {
      list: state.sortedProducts,
      get: getProducts,
      sort: sortProducts,
      sortByCategories: sortProductsByCategories
    },

    globalSearch: {
      state: globalSearch,
      search: search
    },

    auth: {
      login: login,
      logout: logout,
      register: register,
      user: auth
    },


  };
  return <AppContext.Provider value={store}> {children} </AppContext.Provider>;
};

export default GlobalStore;
