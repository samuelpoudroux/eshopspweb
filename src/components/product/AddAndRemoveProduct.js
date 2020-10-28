import { Row, Input, Col, Button } from "antd";
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
    <Row align="middle">
      <Col lg={12} md={23} sm={23} xs={18}>
        <Row justify="start">
          <Button
            style={{
              background: styleVariable.secondaryColor,
              color: "white",
              cursor: "pointer",
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 50,
            }}
            onClick={(e) => addProduct(e)}
          >
            +
          </Button>
          <Input
            style={{
              textAlign: "center",
              width: "40%",
              marginLeft: 4,
              marginRight: 4,
            }}
            value={ProductInBasket({ product })}
          />
          <Button
            style={{
              background: styleVariable.mainColor,
              color: "white",
              cursor: "pointer",
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 50,
            }}
            onClick={(e) => removeProduct(e)}
          >
            -
          </Button>
        </Row>
      </Col>

      <Col lg={12} md={1} xs={6} sm={1}>
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
