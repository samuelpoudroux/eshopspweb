import { Row, Input, Col, Button, Badge, Popconfirm, notification } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import styleVariable from "../../styleVariable";
import { useState } from "react";
import {
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { set } from "lodash";

const Addandremoveproduct = ({
  product,
  addNotification,
  subBasket,
  favorite,
  productList,
  setNum: setNumToProductCard,
}) => {
  const { basket } = useContext(AppContext);
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const { add, decrease } = basket;
  const [num, setNum] = useState(0);
  const addProduct = (e) => {
    if (product.stockNumber === num) {
      notification.open({
        message: `Stock insuffisant`,
        icon: <SmileOutlined style={{ color: "red" }} />,
        duration: 1,
      });
      return;
    }
    add(product, num);
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

  useEffect(() => {
    setNum(
      (list.find((p) => p.id === product.id) &&
        list.find((p) => p.id === product.id).num) ||
        0
    );

    if (setNumToProductCard) {
      setNumToProductCard(
        (list.find((p) => p.id === product.id) &&
          list.find((p) => p.id === product.id).num) ||
          0
      );
    }
  }, [basket.list]);

  return (
    <Row>
      {product.stockNumber !== 0 && (
        <Row align="middle" onClick={(e) => e.stopPropagation()}>
          <Col
            lg={subBasket ? 15 : !productList ? 14 : 23}
            md={23}
            sm={23}
            xs={!productList ? 14 : 22}
          >
            <Row justify={productList && "center"} align="middle">
              <Button
                style={{
                  color: styleVariable.secondaryColor,
                  cursor: "pointer",
                  paddingLeft: 8,
                  paddingRight: 8,
                  border: 0,
                  borderBottom: `2px solid ${styleVariable.secondaryColor}`,
                  borderTop: `2px solid ${styleVariable.secondaryColor}`,
                  borderRadius: 8,
                }}
                disabled={num === product.stockNumber + 1}
                onClick={(e) => addProduct(e)}
              >
                +
              </Button>
              <Input
                style={{
                  textAlign: "center",
                  width: "30%",
                  marginLeft: 4,
                  marginRight: 4,
                  border: 0,
                  borderRadius: 8,
                  borderTop: "2px solid grey ",
                  borderBottom: "2px solid grey ",
                }}
                min={0}
                value={num}
              />
              {product.num === 1 && subBasket ? (
                <Popconfirm
                  disabled={false}
                  style={{ cursor: "pointer" }}
                  title="Souhaitez vous supprimer le produit du panier？"
                  icon={
                    <QuestionCircleOutlined
                      style={{ color: styleVariable.secondaryColor }}
                    />
                  }
                  onConfirm={(e) => removeProduct(e)}
                >
                  {" "}
                  <Button
                    style={{
                      color: styleVariable.mainColor,
                      cursor: "pointer",
                      paddingLeft: 8,
                      paddingRight: 8,
                      border: 0,
                      borderBottom: `2px solid ${styleVariable.mainColor}`,
                      borderTop: `2px solid ${styleVariable.mainColor}`,
                      borderRadius: "8px",
                    }}
                  >
                    -
                  </Button>
                </Popconfirm>
              ) : (
                <Button
                  style={{
                    color: styleVariable.mainColor,
                    cursor: "pointer",
                    paddingLeft: 8,
                    paddingRight: 8,
                    border: 0,
                    borderBottom: `2px solid ${styleVariable.mainColor}`,
                    borderTop: `2px solid ${styleVariable.mainColor}`,
                    borderRadius: "8px",
                  }}
                  onClick={(e) => removeProduct(e)}
                >
                  -
                </Button>
              )}
            </Row>
          </Col>

          {num > 0 && !favorite && (
            <Col
              lg={!productList ? 1 : 1}
              md={1}
              xs={!productList ? 3 : 2}
              sm={1}
            >
              <Row align="middle" justify="center">
                <RemoveSeveralProducts num={num} product={product} />
              </Row>
            </Col>
          )}

          {!productList && (
            <Col lg={subBasket ? 6 : 9} md={22} sm={1} xs={6}>
              <Row align="middle" justify="end">
                <Badge
                  style={{
                    background: styleVariable.secondaryColor,
                  }}
                  count={num}
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
          )}
        </Row>
      )}
    </Row>
  );
};

Addandremoveproduct.propTypes = {};

export default Addandremoveproduct;
