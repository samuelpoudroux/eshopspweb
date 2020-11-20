import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import _ from "lodash";
//add product to basket
const add = async (basketList, product) => {
  if (product.stockNumber === 0) {
    return notification.open({
      message: `Stock indisponible`,
      icon: <SmileOutlined style={{ color: "red" }} />,
      duration: 1,
    });
  }
  let copy = await _.cloneDeep(basketList);
  const produitIsAlreadyAdded =
    basketList && basketList.find((p) => p.id === product.id);
  if (produitIsAlreadyAdded === undefined) {
    copy.push({
      ...product,
      num: 1,
    });
    localStorage.setItem(
      "basket",
      JSON.stringify([
        ...copy,
        {
          ...product,
          num: 1,
        },
      ])
    );
    return [...copy];
  } else {
    const productIndex =
      basketList && basketList.findIndex((p) => p.id === product.id);
    if (produitIsAlreadyAdded.num >= produitIsAlreadyAdded.stockNumber) {
      notification.open({
        message: `Stock maximum pour ce produit`,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
      copy.splice(productIndex, 1, {
        ...product,
        num: produitIsAlreadyAdded.stockNumber,
      });
    } else {
      copy.splice(productIndex, 1, {
        ...product,
        num: produitIsAlreadyAdded.num + 1,
      });
    }
    localStorage.setItem("basket", JSON.stringify([...copy]));
    return [...copy];
  }
};

const addAllFavorites = async (basketList, favorites) => {
  favorites.map((favorite) => {
    if (favorite.stockNumber !== 0) {
      const productAlreadyInBasket =
        basketList && basketList.find((e) => e.id === favorite.id);
      if (!productAlreadyInBasket) {
        basketList.push({ ...favorite, num: 1 });
      }
    }
  });
  localStorage.setItem("basket", JSON.stringify([...basketList]));
  return [...basketList];
};

// remove prodcut from basket
const decrease = async (basketList, product) => {
  const copy = _.cloneDeep(basketList);
  const productIsHad = copy && copy.find((p) => p.id === product.id);
  if (productIsHad !== undefined) {
    const productIndex = copy && copy.findIndex((p) => p.id === product.id);
    if (productIsHad.num === 1) {
      await copy.splice(productIndex, 1);
    } else {
      await copy.splice(productIndex, 1, {
        ...productIsHad,
        num: productIsHad.num > 0 ? productIsHad.num - 1 : 0,
      });
    }
    localStorage.setItem("basket", JSON.stringify([...copy]));
  }
  return [...copy];
};
// remove all products from basket
const removeAll = async () => {
  localStorage.setItem("basket", JSON.stringify([]));
  return [];
};

const removeProduct = async (basketList, product) => {
  const productToDecrease =
    basketList && basketList.find((p) => p.id === product.id);
  if (productToDecrease !== undefined) {
    const productIndex =
      basketList && basketList.findIndex((p) => p.id === product.id);
    basketList.splice(productIndex, 1);
  }
  localStorage.setItem("basket", JSON.stringify([...basketList]));
  return [...basketList];
};

export { add, decrease, removeAll, removeProduct, addAllFavorites };
