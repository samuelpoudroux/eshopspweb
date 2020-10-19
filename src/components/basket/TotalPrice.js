import React, { useCallback, useContext } from "react";
import { Badge } from "antd";
import { getTotalPrice } from "../../repository/product";
import { EuroOutlined } from "@ant-design/icons";
const TotalPrice = ({ setBasketActive, basketIsActive, iconEuroColor }) => {
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList ? basketList : []);
  }, [basketList]);
  const totalPrice = totalPrices();
  return (
    <Badge
      style={{ backgroundColor: "#fff", color: "#89ba17" }}
      count={`${totalPrice}`}
    >
      <EuroOutlined
        style={{
          fontSize: "30px",
          color: iconEuroColor || "white",
          marginTop: "10px",
        }}
        onClick={() => setBasketActive(!basketIsActive)}
      />
    </Badge>
  );
};

export default TotalPrice;
