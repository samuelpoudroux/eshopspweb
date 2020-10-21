import { Badge } from "antd";
import React from "react";

const ProductNumber = ({ product }) => {
  const productInBasket =
    JSON.parse(localStorage.getItem("basket")).find(
      (e) => product.id === e.id
    ) || null;

  return (
    <Badge
      style={{
        backgroundColor: "#89ba17",
        color: "white",
      }}
      count={`${
        productInBasket && productInBasket.num ? productInBasket.num : "0"
      } piéces dans le panier`}
    />
  );
};

export default ProductNumber;
