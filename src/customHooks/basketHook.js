import React, { useEffect, useCallback, useReducer, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";

import {
  add,
  decrease,
  removeAll,
  addAllFavorites,
  removeProduct,
} from "../repository/basket";

import { checkProductsAvaibality } from "../repository/product";
import { notification } from "antd";
// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useBasket = () => {
  const [basketList, setBasketList] = useState(
    (localStorage.getItem("basket") &&
      JSON.parse(localStorage.getItem("basket"))) ||
      []
  );

  const updatedBasketRelatedToProductsAvaibility = useCallback(async () => {
    const newBasket = await checkProductsAvaibality(basketList);
    if (basketList.length > 0) {
      notification.open({
        message: "Panier mis à jour en fonction des disponibilités",
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }

    setBasketList(newBasket);
  }, [basketList]);

  useEffect(() => {
    updatedBasketRelatedToProductsAvaibility();
  }, []);

  const addProductTobasket = useCallback(
    async (product) => {
      const basket = await checkProductsAvaibality(basketList);
      const newBasket = await add(basket, product);
      setBasketList(newBasket);
    },
    [basketList]
  );

  const addAllFavoritesToBasket = useCallback(
    async (favorites) => {
      const newBasket = await addAllFavorites(basketList, favorites);
      setBasketList(newBasket);
    },
    [basketList]
  );

  const decreaseProductFromBasket = useCallback(
    async (product) => {
      const newBasket = await decrease(basketList, product);
      setBasketList(newBasket);
    },
    [basketList]
  );

  const removeAllProductsFromBasket = useCallback(async () => {
    const newBasket = await removeAll();
    setBasketList(newBasket);
  }, [basketList]);

  const removeProductFromBasket = useCallback(
    async (product) => {
      const newBasket = await removeProduct(basketList, product);
      setBasketList(newBasket);
    },
    [basketList]
  );

  return {
    addProductTobasket,
    basketList,
    decreaseProductFromBasket,
    removeAllProductsFromBasket,
    removeProductFromBasket,
    addAllFavoritesToBasket,
  };
};

export default useBasket;
