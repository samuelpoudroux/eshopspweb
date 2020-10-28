import React, { useCallback, useContext } from "react";
import { Badge } from "antd";
import { getTotalPrice } from "../../repository/product";
import { EuroOutlined } from "@ant-design/icons";
const TotalPrice = ({
  subBasketVisible,
  iconEuroColor,
  BadgeStyle,
  setSubBasketVisible,
}) => {
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList ? basketList : []);
  }, [basketList]);
  const totalPrice = totalPrices();
  return (
    <Badge style={BadgeStyle} count={`${totalPrice}€`}>
      <EuroOutlined
        style={{
          fontSize: "20px",
          color: iconEuroColor || "white",
          marginRight: "10px",
        }}
        onClick={() => setSubBasketVisible(!subBasketVisible)}
      />
    </Badge>
  );
};

export default TotalPrice;
