import { Row, Input, Col, Button, Badge } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import styleVariable from "../../styleVariable";
import { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Addandremoveproduct = ({
  product,
  addNotification,
  subBasket,
  favorite,
}) => {
  const { basket } = useContext(AppContext);
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const { add, decrease } = basket;
  const [num, setNum] = useState(
    (list.find((p) => p.id === product.id) &&
      list.find((p) => p.id === product.id).num) ||
      1
  );
  const addProduct = (e) => {
    add(product, num);
    addNotification({
      num,
      add: true,
    });
    setTimeout(function () {
      addNotification(false);
    }, 1500);
    e.stopPropagation();
  };
  const removeProduct = (e) => {
    let numToRemove = (num > productNumber && productNumber) || num;
    const productInBasket = list.find((e) => e.id === product.id);
    if (productInBasket && productInBasket.num > 0) {
      addNotification({
        num,
        remove: true,
      });
      setTimeout(function () {
        addNotification(false);
      }, 1500);
    }
    e.stopPropagation();

    decrease(product, numToRemove);
  };

  const productInBasket = () => {
    const productIsFound =
      list &&
      list.length > 0 &&
      !favorite &&
      list.find((p) => p.id === product.id) !== undefined &&
      list.find((p) => p.id === product.id).num > 0 &&
      list.find((p) => p.id === product.id);
    if (productIsFound) {
      return productIsFound;
    } else {
      return false;
    }
  };

  const productNumber = (productInBasket() && productInBasket().num) || 0;

  return (
    <Col lg={24} md={23} sm={18} xs={24}>
      <Row align="middle">
        <Col lg={subBasket ? 15 : 12} md={23} sm={23} xs={14}>
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
              min={0}
              onChange={(e) => setNum(parseInt(e.target.value))}
              defaultValue={num}
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

        {productInBasket() && !favorite && (
          <Col lg={2} md={1} xs={3} sm={1}>
            <Row align="middle" justify="center">
              <RemoveSeveralProducts product={product} />
            </Row>
          </Col>
        )}

        <Col lg={subBasket ? 6 : 9} md={22} sm={1} xs={6}>
          <Row align="middle" justify="end">
            <Badge
              style={{
                background: styleVariable.secondaryColor,
              }}
              count={(productInBasket() && productInBasket().num) || 0}
              showZero
              overflowCount={250}
            >
              <ShoppingCartOutlined
                style={{
                  fontSize: "20px",
                  color: styleVariable.secondaryColor,
                  marginRight: "10px",
                }}
              />
            </Badge>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

Addandremoveproduct.propTypes = {};

export default Addandremoveproduct;
