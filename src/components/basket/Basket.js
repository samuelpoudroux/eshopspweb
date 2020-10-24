import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../context/context";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import CleanBasket from "./CleanBasket";
import { getTotalPrice } from "../../repository/product";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import ProductInBasket from "../product/ProductInBasket";
import RemoveSeveralProducts from "../product/RemoveSeveralProduct";
import { join } from "lodash";

const Basket = ({ setBasketActive }) => {
  const { basket } = useContext(AppContext);
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList);
  }, [basket]);
  const productName = (product) => {
    return (
      <Row justify="space-between">
        <h2 style={{ color: "#89ba17" }}>{product.name}</h2>
      </Row>
    );
  };

  const closeBasket = (e) => {
    setBasketActive(false);
  };

  return (
    <div className="basket" onClick={(e) => closeBasket(e)}>
      <Col className="basket_inner">
        <div style={{ padding: "2%" }}>
          <Row justify="space-between">
            <CleanBasket color={"white"} fontSize={"30px"} />
            <CloseCircleOutlined
              style={{ color: "white", fontSize: "30px" }}
              onClick={() => setBasketActive(false)}
            />
          </Row>
          <Row
            style={{ marginTop: "10%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {basketList &&
              basketList.length > 0 &&
              basketList.map(
                (product) =>
                  product.num > 0 && (
                    <Col span={24}>
                      <Row justify="center">
                        <Col key={product.id} span={24}>
                          <Card
                            style={{ marginTop: "5px" }}
                            title={productName(product)}
                            bordered={false}
                          >
                            <Row justify="space-between" align="middle">
                              <Col span={14}>
                                <Addandremoveproduct product={product} />
                              </Col>
                              <Col span={10}>
                                <p style={{ color: "#686868", margin: 0 }}>
                                  Sous-total:
                                  {product.productPrice * product.num}€
                                </p>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  )
              )}
          </Row>
          <Row align="middle" style={{ color: "white", fontSize: "2em" }}>
            {!list || (list.length === 0 && <p>Votre panier est vide</p>)}
          </Row>
        </div>

        <Row
          style={{
            marginTop: "20%",
            background: "rgba(104,104,104, 0.8)",
            padding: "10px",
          }}
          justify="space-between"
        >
          <Col>
            <b style={{ color: "white", fontSize: "1.5em" }}>Prix total:</b>{" "}
          </Col>
          <Col>
            <b style={{ color: "white", fontSize: "1.5em" }}>
              {totalPrices()}€
            </b>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

Basket.propTypes = {
  setBasketActive: PropTypes.func,
};

export default Basket;
