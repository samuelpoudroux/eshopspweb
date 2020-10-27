import { Row, Input, Col } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import ProductInBasket from "./ProductInBasket";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import useResponsive from "../../customHooks/responsiveHook";
import styleVariable from "../../styleVariable";

const Addandremoveproduct = ({ product, addNotification }) => {
  const { basket } = useContext(AppContext);
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const { isMobile } = useResponsive();
  const { add, decrease } = basket;
  const addProduct = (e) => {
    add(product);
    addNotification({
      num: "1",
      add: true,
    });
    setTimeout(function () {
      addNotification(false);
    }, 1500);
    e.stopPropagation();
  };
  const removeProduct = (e) => {
    const productInBasket = list.find((e) => e.id === product.id);
    if (productInBasket && productInBasket.num > 0) {
      addNotification({
        num: "1",
        remove: true,
      });
      setTimeout(function () {
        addNotification(false);
      }, 1500);
    }
    e.stopPropagation();
    decrease(product);
  };

  return (
    <Row justify={isMobile ? "start" : "space-between"} align="middle">
      <Col lg={3} md={6} sm={5} xs={5}>
        <Row justify="start">
          <button
            style={{
              background: styleVariable.secondaryColor,
              border: "2px dotted",
              color: "white",
              cursor: "pointer",
            }}
            onClick={(e) => addProduct(e)}
          >
            +
          </button>
        </Row>
      </Col>
      <Col lg={9} md={6} sm={5} xs={5}>
        <Row justify="center">
          <Input
            style={{
              border: `0.2px dotted ${styleVariable.mainColor}`,
              borderRadius: 50,
            }}
            value={ProductInBasket({ product })}
          />
        </Row>
      </Col>
      <Col lg={3} md={6} sm={5} xs={5}>
        <Row justify="end">
          <button
            style={{
              background: styleVariable.mainColor,
              border: "2px dotted ",
              color: "white",
              cursor: "pointer",
            }}
            onClick={(e) => removeProduct(e)}
          >
            -
          </button>
        </Row>
      </Col>
      <Col lg={3} md={6} sm={5} xs={5}>
        {list &&
          list.length > 0 &&
          list.find((p) => p.id === product.id) !== undefined &&
          list.find((p) => p.id === product.id).num > 0 && (
            <Row align="middle" justify="end">
              <RemoveSeveralProducts product={product} />
            </Row>
          )}
      </Col>
    </Row>
  );
};

Addandremoveproduct.propTypes = {};

export default Addandremoveproduct;
