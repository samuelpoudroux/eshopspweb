import React from "react";
import PropTypes from "prop-types";
import {
  HeartFilled,
  QuestionCircleOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  DeleteFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { Col, Row, Popconfirm, Drawer, Button, notification } from "antd";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import styleVariable from "../../styleVariable";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import useResponsive from "../../customHooks/responsiveHook";
import useBasket from "../../customHooks/basketHook";
import { upperCase } from "../../helpers/UpperCase";

const Favorites = ({
  setFavoriteActive,
  history,
  favoriteIsActive,
  notClickable,
}) => {
  const { favorites, basket } = useContext(AppContext);
  const { notificationInfo, addNotification } = useBasket();
  const { isMobile } = useResponsive();
  const { addAllFavoritesToBasket } = basket;
  const {
    removeAllProductFromFavorites,
    removeProductFromFavorites,
  } = favorites;
  const list = JSON.parse(localStorage.getItem("favorites")) || [];

  const drawerHeader = () => {
    return (
      <Row>
        <Col>
          <b
            style={{
              fontSize: isMobile ? "1em" : "1.3em",
              color: styleVariable.mainColor,
            }}
          >
            Mes coups de
          </b>
        </Col>
        <Col style={{ marginLeft: 10 }}>
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
            title={`Souhaitez vous supprimer tous les coups de coeur`}
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
  const addAllProductToBasket = async () => {
    await addAllFavoritesToBasket(list);
    notification.open({
      message: `Tous vos coup de coeurs sont désormais dans mon panier`,
      icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      duration: 4,
    });
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
      closable={false}
      bodyStyle={{
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      style={{ zIndex: 26, height: "100%", overflowY: "scroll" }}
      footerStyle={{ padding: "0px" }}
      onTouchMove={() => closeFavorites()}
    >
      <Col lg={24} style={{ padding: "10px" }}>
        {list.length === 0 && (
          <Row justify="center">
            <h3>Pas de coups de </h3>
            <HeartFilled
              style={{
                fontSize: "20px",
                marginLeft: 10,
                color: "red",
              }}
            />
          </Row>
        )}

        <Row justify={isMobile && "center"}>
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
                      cursor: !notClickable && "pointer",
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
                                color: styleVariable.secondaryColor,
                                fontSize: "0.8em",
                                margin: 0,
                              }}
                            >
                              {upperCase(product.name)}
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
                        notification={notificationInfo}
                        addNotification={addNotification}
                        product={product}
                        notClickable
                        favorite
                      />
                    </Col>

                    <Col xl={1} xs={1} sm={1}>
                      <Row>
                        <Popconfirm
                          title={`Souhaitez vous supprimer ce produit de vos coups de coeur`}
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
        <Row
          align="middle"
          justify="start"
          style={{ padding: "10px", marginTop: 30 }}
          gutter={20}
        >
          <Col span={24}>
            {list.length > 0 && (
              <Row justify="center">
                <Button
                  icon={
                    <ShoppingCartOutlined
                      style={{ color: styleVariable.secondaryColor }}
                    />
                  }
                  style={{
                    color: styleVariable.mainColor,
                    background: "white",
                    maxWidth: "100%",
                  }}
                  onClick={() => addAllProductToBasket()}
                >
                  J'ajoute tous mes coups de coeur
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Drawer>
  );
};

Favorites.propTypes = {
  setFavoritesActive: PropTypes.func,
};

export default Favorites;
