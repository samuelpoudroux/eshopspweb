import { Row, Input, Col, notification } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import ProductInBasket from "./ProductInBasket";
import { SmileOutlined } from "@ant-design/icons";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import useResponsive from "../../customHooks/responsiveHook";

const Addandremoveproduct = ({ product, buttonPadding }) => {
  const { basket } = useContext(AppContext);
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const { isMobile } = useResponsive();
  const { add, decrease } = basket;
  const addProduct = (e) => {
    add(product);
    notification.open({
      message: `1 ${product.name} ajouté au panier`,
      icon: <SmileOutlined style={{ color: "#89ba17" }} />,
      duration: 1,
    });
    e.stopPropagation();
  };
  const removeProduct = (e) => {
    const productInBasket = list.find((e) => e.id === product.id);
    if (productInBasket.num > 0) {
      notification.open({
        message: `1 ${product.name} retiré du panier`,
        icon: <SmileOutlined style={{ color: "#89ba17" }} />,
        duration: 1,
      });
    }

    e.stopPropagation();
    decrease(product);
  };

  return (
    <Row justify={isMobile ? "center" : "space-between"} align="middle">
      <Col lg={3} md={6} sm={5} xs={5}>
        <Row justify="start">
          <button
            style={{
              background: "#89ba17",
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
            style={{ border: "0.2px dotted #878888" }}
            value={ProductInBasket({ product })}
          />
        </Row>
      </Col>
      <Col lg={3} md={6} sm={5} xs={5}>
        <Row justify="end">
          <button
            style={{
              background: "#878888",
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
      <Col lg={6} md={6} sm={5} xs={5}>
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
