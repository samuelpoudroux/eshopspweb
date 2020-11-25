import React, { useCallback, useEffect, useState } from "react";
import { getNumberOfProducts } from "../../repository/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import styleVariable from "../../styleVariable";
import { useContext } from "react";
import { AppContext } from "../../context/context";

const ProductsNumber = ({
  notClickable,
  setSubBasketVisible,
  subBasketVisible,
}) => {
  const { basket } = useContext(AppContext);
  const { basketList } = basket;
  const [productNumber, setProductNumber] = useState(0);
  const getProductNumber = useCallback(async () => {
    setProductNumber(await getNumberOfProducts(basketList ? basketList : []));
  }, [basketList]);

  useEffect(() => {
    getProductNumber();
  }, [basketList]);
  return (
    <Badge
      style={{
        background: notClickable ? styleVariable.secondaryColor : "white",
        color: notClickable ? "white" : styleVariable.secondaryColor,
        textAlign: "center",
        minWidth: "50px",
      }}
      offset={[23, -5]}
      count={`${productNumber}`}
      overflowCount={99}
    >
      <ShoppingCartOutlined
        style={{
          fontSize: "20px",
          color:
            productNumber === 0 || notClickable
              ? styleVariable.mainColor
              : "white",
        }}
        onClick={() =>
          !notClickable &&
          basketList.length > 0 &&
          setSubBasketVisible(!subBasketVisible)
        }
      />
    </Badge>
  );
};

export default ProductsNumber;
