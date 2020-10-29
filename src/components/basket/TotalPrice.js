import React, { useCallback, useContext } from "react";
import { Badge } from "antd";
import { getTotalPrice } from "../../repository/product";
import { EuroOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";
const TotalPrice = ({
  subBasketVisible,
  BadgeStyle,
  setSubBasketVisible,
  notClickable,
}) => {
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList ? basketList : []);
  }, [basketList]);
  const totalPrice = totalPrices();
  return (
    <Badge
      style={{
        background: notClickable ? styleVariable.secondaryColor : "white",
        color: notClickable ? "white" : styleVariable.secondaryColor,
        paddingRight: "5px",
        paddingLeft: "5px",
      }}
      count={`${totalPrice}€`}
    >
      <EuroOutlined
        style={{
          fontSize: "20px",
          color: notClickable ? styleVariable.mainColor : "white",
          marginRight: "22px",
        }}
        onClick={() => !notClickable && setSubBasketVisible(!subBasketVisible)}
      />
    </Badge>
  );
};

export default TotalPrice;
