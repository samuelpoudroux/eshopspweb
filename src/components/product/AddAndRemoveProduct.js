import { Row, Col } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/context";

const Addandremoveproduct = ({ product, buttonPadding }) => {
  const { basket } = useContext(AppContext);
  const { add, decrease } = basket;
  const addProduct = (e) => {
    add(product);
    e.stopPropagation();
  };
  const removeProduct = (e) => {
    e.stopPropagation();
    decrease(product);
  };
  return (
    <Row justify="center">
      <button
        style={{
          background: "#89ba17",
          border: "3px dotted",
          color: "white",
          cursor: "pointer",
          padding: buttonPadding,
        }}
        onClick={(e) => addProduct(e)}
      >
        +
      </button>
      <button
        style={{
          background: "#878888",
          border: "3px dotted ",
          color: "white",
          cursor: "pointer",
          padding: buttonPadding,
        }}
        onClick={(e) => removeProduct(e)}
      >
        -
      </button>
    </Row>
  );
};

Addandremoveproduct.propTypes = {};

export default Addandremoveproduct;
