import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import Addandremoveproduct from "../product/AddAndRemoveProduct";

const Favorites = ({ setFavoriteActive }) => {
  const list = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log("toto", list);
  const productName = (product) => {
    return (
      <Row justify="space-between">
        <h2 style={{ color: "#89ba17" }}>{product.name}</h2>
      </Row>
    );
  };

  const closeFavorites = (e) => {
    setFavoriteActive(false);
  };

  return (
    <div className="basket" onClick={(e) => closeFavorites(e)}>
      <Col className="basket_inner">
        <div style={{ padding: "2%" }}>
          <Row justify="space-between">
            <CloseCircleOutlined
              style={{ color: "white", fontSize: "30px" }}
              onClick={() => setFavoriteActive(false)}
            />
          </Row>
          <Row
            style={{ marginTop: "10%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {list &&
              list.length > 0 &&
              list.map((product) => (
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
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </div>
      </Col>
    </div>
  );
};

Favorites.propTypes = {
  setFavoritesActive: PropTypes.func,
};

export default Favorites;
