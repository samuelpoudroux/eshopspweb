import { Row, Input, Col, notification, Badge } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import ProductInBasket from "./ProductInBasket";
import { SmileOutlined } from "@ant-design/icons";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import useResponsive from "../../customHooks/responsiveHook";

const Addandremoveproduct = ({ product, buttonPadding }) => {
  const { basket } = useContext(AppContext);
  const [notification, addNotification] = useState(false);
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
    }, 1000);
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
      }, 1000);
    }

    e.stopPropagation();
    decrease(product);
  };
  console.log("noti", notification.num);
  return (
    <Row justify={isMobile ? "start" : "space-between"} align="middle">
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
          {notification && notification.add && (
            <Badge
              style={{ background: "#be924a" }}
              count={`${notification.add && "+" + notification.num}`}
            >
              <a style={{ marginLeft: 5 }} href="#" className="head-example" />
            </Badge>
          )}
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
          {notification && notification.remove && (
            <Badge
              style={{ background: "#be924a" }}
              count={`${notification.remove && "-" + notification.num}`}
            >
              <a style={{ marginLeft: 5 }} href="#" className="head-example" />
            </Badge>
          )}
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
