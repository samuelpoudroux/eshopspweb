import React, { useCallback, useContext } from "react";
import { getNumberOfProducts } from "../../repository/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Row } from "antd";

const ProductsNumber = ({
  setBasketActive,
  basketIsActive,
  iconBasketColor,
  BadgeStyle,
}) => {
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const numOfProducts = useCallback(() => {
    return getNumberOfProducts(basketList ? basketList : []);
  }, [basketList]);
  const totalOfProducts = numOfProducts();
  return (
    <Badge style={BadgeStyle} count={`${totalOfProducts}`}>
      <ShoppingCartOutlined
        style={{
          fontSize: "20px",
          color: iconBasketColor || "white",
          marginRight: "10px",
        }}
        onClick={() => setBasketActive(!basketIsActive)}
      />
    </Badge>
  );
};

export default ProductsNumber;
