import React, { useRef } from "react";
import useBasket from "./customHooks/basketHook";
import useProductList from "./customHooks/productListHook";
import useGlobalSearchResult from "./customHooks/globalSearchHook";
import { AppContext } from "./context/context";
import useAuth from "./customHooks/authHook";
import useFavorites from "./customHooks/favoritesHook";
import usePopup from "./customHooks/popupHook";

// the global store we give acces to our hooks to all appplication by this global store through appcontext provider
const GlobalStore = ({ children }) => {
  const {
    userBasket,
    addProductTobasket,
    decreaseProductFromBasket,
    removeAllProductsFromBasket,
    removeProductFromBasket,
    decreaseProductsFromBasket,
    addAllFavoritesToBasket,
    setActive,
  } = useBasket();
  const {
    state,
    getProducts,
    sortProducts,
    sortProductsByCategories,
    getAllProducts,
  } = useProductList();
  const { globalSearch, search } = useGlobalSearchResult();
  const appRef = useRef(null);
  const {
    favorites,
    addProductToFavorites,
    removeProductFromFavorites,
    removeAllProductFromFavorites,
  } = useFavorites();
  const {
    favoriteIsActive,
    setFavoriteActive,
    subBasketVisible,
    setSubBasketVisible,
    menuIsOpened,
    setMenuIsOpened,
    chatActive,
    setChatActive,
    addProduct,
    setAddProduct,
    addCategory,
    setAddCategory,
  } = usePopup();
  const { auth, login, logout, register, userData } = useAuth();
  const store = {
    basket: {
      list: userBasket,
      add: addProductTobasket,
      decrease: decreaseProductFromBasket,
      removeAllProducts: removeAllProductsFromBasket,
      removeProductFromBasket: removeProductFromBasket,
      decreaseProductsFromBasket: decreaseProductsFromBasket,
      addAllFavoritesToBasket: addAllFavoritesToBasket,
      setActive: setActive,
    },
    products: {
      list: state.sortedProducts,
      notFound: state.notFound,
      get: getProducts,
      getAllProducts,
      sort: sortProducts,
      sortByCategories: sortProductsByCategories,
    },

    globalSearch: {
      state: globalSearch,
      search,
    },

    auth: {
      login,
      logout,
      register,
      user: auth,
      userData,
    },

    favorites: {
      addProductToFavorites,
      removeProductFromFavorites,
      removeAllProductFromFavorites,
      favorites,
    },

    popup: {
      favoriteIsActive,
      setFavoriteActive,
      subBasketVisible,
      setSubBasketVisible,
      menuIsOpened,
      setMenuIsOpened,
      chatActive,
      setChatActive,
      addProduct,
      setAddProduct,
      addCategory,
      setAddCategory,
    },

    appRef: appRef,
  };
  return <AppContext.Provider value={store}> {children} </AppContext.Provider>;
};

export default GlobalStore;
