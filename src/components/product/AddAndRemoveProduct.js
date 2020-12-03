import { Row, Input, Col, Button, Badge, Popconfirm, notification } from "antd";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/context";
import RemoveSeveralProducts from "./RemoveSeveralProduct";
import styleVariable from "../../styleVariable";
import { useState } from "react";
import {
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const Addandremoveproduct = ({ product, subBasket, favorite, productList }) => {
  const { basket } = useContext(AppContext);
  const { basketList } = basket;
  const { add, decrease } = basket;
  const [num, setNum] = useState(
    (basketList &&
      basketList.find((p) => p.id === product.id) &&
      basketList.find((p) => p.id === product.id).num) ||
      0
  );

  const addProduct = (e) => {
    add(product);
    e.stopPropagation();
  };
  const removeProduct = (e) => {
    e.stopPropagation();
    decrease(product);
  };

  useEffect(() => {
    setNum(
      (basketList &&
        basketList.find((p) => p.id === product.id) &&
        basketList.find((p) => p.id === product.id).num) ||
        0
    );
  }, [
    basketList &&
      basketList.find((p) => p.id === product.id) &&
      basketList.find((p) => p.id === product.id).num,
  ]);

  return (
    <Row>
      <Row align="middle" onClick={(e) => e.stopPropagation()}>
        <Col
          lg={subBasket ? 15 : !productList ? 14 : 23}
          md={22}
          sm={15}
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
              disabled={
                num === product.stockNumber || product.stockNumber === 0
              }
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
              disabled={
                num === product.stockNumber || product.stockNumber === 0
              }
            />
            {product.num === 1 && subBasket ? (
              <Popconfirm
                disabled={product.stockNumber === 0}
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
                  disabled={product.stockNumber === 0}
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
                disabled={product.stockNumber === 0}
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
            sm={4}
          >
            <Row align="middle" justify="center">
              <RemoveSeveralProducts num={num} product={product} />
            </Row>
          </Col>
        )}

        {!productList && (
          <Col lg={subBasket ? 6 : 9} md={2} sm={4} xs={6}>
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
    </Row>
  );
};

Addandremoveproduct.propTypes = {};

export default Addandremoveproduct;
