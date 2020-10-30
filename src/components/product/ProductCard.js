import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import { Badge, Tag } from "antd";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Addandremoveproduct from "./AddAndRemoveProduct";
import useResponsive from "../../customHooks/responsiveHook";
import {
  HeartFilled,
  HeartOutlined,
  CrownFilled,
  CrownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import useIsAdmin from "../../customHooks/isAdminHooks";
import Axios from "axios";
import styleVariable from "../../styleVariable";
import useBasket from "../../customHooks/basketHook";
import BasketNotification from "../Badge/BasketNotification";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT_IS_NEWNESS,
  REACT_APP_API_PRODUCT,
} = process.env;

const Productcard = ({ product, history, large }) => {
  const { globalSearch, favorites, products } = useContext(AppContext);
  const { isAdmin } = useIsAdmin();
  const { search } = globalSearch;
  const { notification, addNotification, renderNotification } = useBasket();
  const list = JSON.parse(localStorage.getItem("basket")) || [];

  const isFavorites =
    JSON.parse(localStorage.getItem("favorites")) &&
    JSON.parse(localStorage.getItem("favorites")).length > 0 &&
    JSON.parse(localStorage.getItem("favorites")).find(
      (e) => e.id === product.id
    )
      ? true
      : false;
  const {
    id,
    name,
    category,
    notation,
    productPrice,
    shortDescription,
    productPriceReduced,
  } = product;
  const priceStyle = {
    color: styleVariable.mainColor,
    fontSize: "1em",
    margin: "0",
  };

  const goToProductDetails = (e) => {
    search("");
    history.push(`/productDetails/${id}`);
  };

  const addFavorites = () => {
    favorites.addProductToFavorites(product);
  };
  const removeFromFavorites = () => {
    favorites.removeProductFromFavorites(product);
  };
  const isProductNewNess = async (e, value) => {
    e.stopPropagation();
    await Axios.put(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_PRODUCT_IS_NEWNESS +
        id,
      { newNess: value }
    );
    products.getAllProducts();
  };

  return (
    <Col
      xs={23}
      sm={24}
      md={10}
      lg={6}
      xl={5}
      xxl={4}
      style={{
        // boxShadow: " 0px  10px 10px rgba(90, 97, 101, 0.7)",
        background: "#fff",
        borderRadius: "2px",
        position: "relative",
        cursor: "pointer",
        margin: 20,
        height: "100%",
        padding: "8px",
      }}
      key={product.id}
      className="card"
    >
      <Col
        onClick={(e) => goToProductDetails(e)}
        style={{
          padding: "3%",
        }}
      >
        <Row justify="center" style={{ height: "80px", width: "100%" }}>
          <img
            alt="Image du produit"
            src={`${product.imageUrl}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </Row>

        <Row align="middle" style={{ marginTop: 20 }} justify="space-between">
          <Col
            lg={20}
            md={16}
            sm={24}
            xs={24}
            style={{ wordBreak: "break-all", paddingTop: 15 }}
          >
            <b style={{ color: styleVariable.mainColor }}>{name}</b>
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 20 }}>
          <Col lg={6} md={6} sm={8} xs={4}>
            <p
              style={{
                fontSize: "1.2em",
                color: styleVariable.mainColor,
                margin: 0,
              }}
            >
              {productPrice}€
            </p>
          </Col>
          <Col lg={6} md={6} sm={8} xs={4}>
            <s
              style={{
                fontSize: "1.2em",
                color: "red",
              }}
            >
              {productPriceReduced && `${productPriceReduced + "€"}`}
            </s>
          </Col>

          <Col lg={12} md={12} sm={8} xs={15}>
            <Row justify="end">
              <Tag color={styleVariable.secondaryColor}>{category}</Tag>
            </Row>
          </Col>
        </Row>

        <Row style={{ paddingTop: 20 }}>
          <p style={{ margin: 0, wordBreak: "break-all" }}>
            {shortDescription && shortDescription}
          </p>
        </Row>

        <Col
          onClick={(e) => e.stopPropagation()}
          align="middle"
          style={{ marginTop: 20 }}
        >
          <Col lg={24} md={24} sm={24} xs={24}>
            <Row align="middle">
              <Addandremoveproduct
                product={product}
                notification={notification}
                addNotification={addNotification}
              />
            </Row>
          </Col>

          <Row align="middle" justify="space-between" style={{ marginTop: 20 }}>
            <Col lg={12} md={22}>
              <Row align="middle">
                <ReactStars
                  count={5}
                  value={notation}
                  edit={false}
                  size={24}
                  activeColor={styleVariable.secondaryColor}
                />
              </Row>
            </Col>
            <Col lg={8} md={2}>
              <Row align="middle" justify="start">
                {isFavorites && (
                  <HeartFilled
                    style={{
                      fontSize: 24,
                      color: styleVariable.secondaryColor,
                    }}
                    onClick={() => removeFromFavorites()}
                  />
                )}
                {!isFavorites && (
                  <HeartOutlined
                    style={{
                      fontSize: 24,
                      color: styleVariable.secondaryColor,
                    }}
                    onClick={() => addFavorites()}
                  />
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        {isAdmin && product.newNess == 0 && (
          <Row justify="center" align="middle">
            <CrownOutlined onClick={(e) => isProductNewNess(e, "true")} />
          </Row>
        )}
        {isAdmin && product.newNess === 1 && (
          <Row justify="center" align="middle">
            <CrownFilled
              style={{ color: "#be924a" }}
              onClick={(e) => isProductNewNess(e, "false")}
            />
          </Row>
        )}
      </Col>
    </Col>
  );
};

Productcard.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Productcard);
