import React, { useCallback, useContext } from "react";
import { getNumberOfProducts } from "../../repository/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Row } from "antd";

const ProductsNumber = ({
  iconBasketColor,
  setSubBasketVisible,
  subBasketVisible,
  BadgeStyle,
}) => {
  const basketList = JSON.parse(localStorage.getItem("basket")) || [];
  console.log("basketList", basketList);
  const numOfProducts = useCallback(() => {
    return getNumberOfProducts(basketList ? basketList : []);
  }, [basketList]);
  const totalOfProducts = numOfProducts();
  return (
    <Badge style={BadgeStyle} count={`${totalOfProducts}`}>
      <ShoppingCartOutlined
        style={{
          fontSize: "20px",
          color: totalOfProducts === 0 ? "grey" : "white",
          marginRight: "10px",
        }}
        onClick={() => setSubBasketVisible(!subBasketVisible)}
      />
    </Badge>
  );
};

export default ProductsNumber;
