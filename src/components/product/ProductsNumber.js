import React, { useCallback, useContext } from "react";
import { getNumberOfProducts } from "../../repository/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Row } from "antd";
import styleVariable from "../../styleVariable";

const ProductsNumber = ({
  notClickable,
  setSubBasketVisible,
  subBasketVisible,
}) => {
  const basketList = JSON.parse(localStorage.getItem("basket")) || [];
  const numOfProducts = useCallback(() => {
    return getNumberOfProducts(basketList ? basketList : []);
  }, [basketList]);
  const totalOfProducts = numOfProducts();
  return (
    <Badge
      style={{
        background: notClickable ? styleVariable.secondaryColor : "white",
        color: notClickable ? "white" : styleVariable.secondaryColor,
        paddingRight: "15px",
        paddingLeft: "15px",
      }}
      count={`${totalOfProducts}`}
      overflowCount={1000}
    >
      <ShoppingCartOutlined
        style={{
          fontSize: "20px",
          marginRight: "18px",
          color:
            totalOfProducts === 0 || notClickable
              ? styleVariable.mainColor
              : "white",
        }}
        onClick={() => !notClickable && setSubBasketVisible(!subBasketVisible)}
      />
    </Badge>
  );
};

export default ProductsNumber;
