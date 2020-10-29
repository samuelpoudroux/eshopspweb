import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ShoppingCartOutlined,
  HeartFilled,
  QuestionCircleOutlined,
  DeleteOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Col, Row, Popconfirm, Drawer, Badge } from "antd";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import styleVariable from "../../styleVariable";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import useResponsive from "../../customHooks/responsiveHook";
import useBasket from "../../customHooks/basketHook";

const Favorites = ({ setFavoriteActive, history, favoriteIsActive }) => {
  const { favorites } = useContext(AppContext);
  const { notification, addNotification } = useBasket();
  const { isMobile } = useResponsive();
  const basketList = JSON.parse(localStorage.getItem("basket")) || [];
  const productInBasket = (product) => {
    const productNumber = basketList.find((p) => p.id === product.id).num || 0;
    return productNumber;
  };
  const {
    removeAllProductFromFavorites,
    removeProductFromFavorites,
  } = favorites;
  const list = JSON.parse(localStorage.getItem("favorites")) || [];

  const drawerHeader = () => {
    return (
      <Row>
        <Col lg={8} md={5} xs={15} sm={15}>
          <b
            style={{
              fontSize: isMobile ? "1em" : "1.3em",
              color: styleVariable.mainColor,
            }}
          >
            Vos futurs Achats{" "}
          </b>
        </Col>
        <Col lg={1} md={5} xs={1} sm={1}>
          <Row>
            <HeartFilled
              style={{
                fontSize: "20px",
                color: "red",
              }}
            />
          </Row>
        </Col>
        <Col lg={14} md={5} xs={5} sm={5}>
          <Popconfirm
            title={`Souhaitez vous supprimer tous les favoris`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => removeAllProductFromFavorites()}
          >
            <Row justify="end" align="middle">
              <DeleteFilled
                style={{
                  color: styleVariable.secondaryColor,
                  fontSize: "20px",
                }}
              />
            </Row>
          </Popconfirm>
        </Col>
      </Row>
    );
  };
  const closeFavorites = (e) => {
    setFavoriteActive(false);
  };

  return (
    <Drawer
      title={drawerHeader()}
      closable={true}
      placement="right"
      width={isMobile ? 296 : 780}
      onClose={() => closeFavorites()}
      visible={favoriteIsActive}
      height={"auto"}
      key={"top"}
      bodyStyle={{
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      style={{ zIndex: 0, height: "100%", overflowY: "scroll" }}
      footerStyle={{ padding: "0px" }}
      onTouchMove={() => closeFavorites()}
    >
      <Col lg={24} style={{ padding: "10px" }}>
        <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
          {list.length > 0
            ? "Je suis intéressé par ces produits"
            : "Pas de produits dans vos favoris"}
        </h3>

        <Row justify="center">
          {list.map(
            (product) =>
              product.num !== 0 && (
                <Col
                  lg={9}
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
                    onClick={() =>
                      history.push(`/productDetails/${product.id}`)
                    }
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
                          <Row justify="center" align="middle">
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

                  <Row
                    style={{ paddingTop: 5 }}
                    justify="space-evenly"
                    align="middle"
                  >
                    <Col span={20}>
                      <Addandremoveproduct
                        notification={notification}
                        addNotification={addNotification}
                        product={product}
                        notClickable
                        favorite
                      />
                    </Col>

                    <Col xl={1} xs={1} sm={1}>
                      <Row>
                        <Popconfirm
                          title={`Souhaitez vous supprimer ce produit des favoris`}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          onConfirm={() => removeProductFromFavorites(product)}
                        >
                          <DeleteOutlined
                            style={{ color: styleVariable.secondaryColor }}
                          />
                        </Popconfirm>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              )
          )}
        </Row>
      </Col>
    </Drawer>
  );
};

Favorites.propTypes = {
  setFavoritesActive: PropTypes.func,
};

export default Favorites;
