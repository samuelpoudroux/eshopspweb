import React from "react";
import PropTypes from "prop-types";
import {
  HeartFilled,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  DeleteFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { Col, Row, Popconfirm, Drawer, Button, notification } from "antd";
import styleVariable from "../../styleVariable";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import useResponsive from "../../customHooks/responsiveHook";
import { FavoriteSubCard } from "./FavoriteSubCard";

const Favorites = ({ history, notClickable }) => {
  const { favorites, basket, popup } = useContext(AppContext);
  const { isMobile } = useResponsive();
  const { addAllFavoritesToBasket } = basket;
  const {
    removeAllProductFromFavorites,
    removeProductFromFavorites,
  } = favorites;

  const { setFavoriteActive, favoriteIsActive } = popup;
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
                <FavoriteSubCard
                  product={product}
                  history={history}
                  notClickable={notClickable}
                  removeProductFromFavorites={removeProductFromFavorites}
                />
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
                  Ajouter au panier
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
