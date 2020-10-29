import React from "react";
import { Badge, Col, Row } from "antd";
import useBasket from "../../customHooks/basketHook";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import styleVariable from "../../styleVariable";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductCardSubBasket = ({ product, history, list }) => {
  const { notification, addNotification, renderNotification } = useBasket();
  const productInBasket =
    (list.find((p) => p.id === product.id) &&
      list.find((p) => p.id === product.id).num) ||
    0;

  return (
    <Col
      lg={8}
      md={11}
      xs={24}
      sm={24}
      style={{
        boxShadow: " 0px  10px 10px rgba(90, 97, 101, 0.7)",
        padding: 5,
        margin: 10,
      }}
    >
      <Row
        onClick={() => history.push(`/productDetails/${product.id}`)}
        key={product.id}
        align="middle"
        style={{
          cursor: "pointer",
        }}
      >
        <Col lg={3} md={6} sm={6} xs={6}>
          <img
            style={{
              height: "20px",
            }}
            src={product.imageUrl}
            alt="image du produit"
          />
        </Col>
        <Col lg={21} md={18} sm={18} xs={18}>
          <Row>
            <Col lg={20} md={18} sm={18} xs={18}>
              <Row
                justify="center"
                align="middle"
                style={{
                  wordBreak: "break-word",
                  marginLeft: 15,
                }}
              >
                <b
                  style={{
                    color: styleVariable.mainColor,
                    fontSize: "0.6em",
                    margin: 0,
                  }}
                >
                  {product.name}
                </b>
              </Row>
            </Col>
            <Col lg={4} md={6} sm={6} xs={6}>
              <Row justify="center" align="middle">
                <b
                  style={{
                    color: styleVariable.secondaryColor,
                  }}
                >
                  {product.productPrice}€
                </b>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingTop: 20 }} align="middle" justify="space-between">
        <Addandremoveproduct
          notification={notification}
          addNotification={addNotification}
          product={product}
          subBasket
        />
      </Row>
      <Row justify="end" style={{ padding: 10 }}>
        <b>Sous Total: {product.num * product.productPrice}€</b>
      </Row>
    </Col>
  );
};

export default ProductCardSubBasket;
