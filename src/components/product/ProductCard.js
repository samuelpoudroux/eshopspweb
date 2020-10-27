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
import { useState } from "react";
import ProductInBasket from "./ProductInBasket";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT_IS_NEWNESS,
  REACT_APP_API_PRODUCT,
} = process.env;

const Productcard = ({ product, history, large }) => {
  const { globalSearch, favorites, products } = useContext(AppContext);
  const { isAdmin } = useIsAdmin();
  const { search } = globalSearch;
  const { isMobile } = useResponsive();
  const [notification, addNotification] = useState(false);

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
    productPriceReduced,
  } = product;
  const priceStyle = {
    color: styleVariable.mainColor,
    fontSize: "1em",
    margin: "0",
  };

  const renderCount = () => {
    if (product && ProductInBasket({ product }) > 0 && notification.add) {
      return `+${notification.num}`;
    } else if (notification && notification.remove) {
      return `-${notification.num}`;
    } else {
      return 0;
    }
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
      xs={20}
      sm={20}
      md={24}
      lg={large || 4}
      style={{
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        background: "#fff",
        borderRadius: "2px",
        position: "relative",
        cursor: "pointer",
        padding: "1px",
        marginTop: isMobile && 20,
      }}
      key={product.id}
    >
      <Col onClick={(e) => goToProductDetails(e)} style={{ padding: "3%" }}>
        <Row justify="center" style={{ height: "80px", width: "100%" }}>
          <img
            alt="Image du produit"
            src={`${product.imageUrl}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </Row>

        <Row align="middle" style={{ marginTop: 20 }}>
          <Col
            lg={20}
            md={16}
            sm={16}
            xs={16}
            style={{ wordBreak: "break-all", paddingTop: 15 }}
          >
            <b style={{ color: styleVariable.mainColor }}>{name}</b>
          </Col>
          <Col lg={4} md={8} sm={8} xs={8} style={{ paddingTop: 15 }}>
            <Badge
              style={{
                background: notification.add
                  ? styleVariable.secondaryColor
                  : "red",
              }}
              count={renderCount()}
            >
              {notification && (
                <ShoppingCartOutlined
                  style={{
                    fontSize: "20px",
                    color: styleVariable.secondaryColor,
                    marginRight: "16px",
                  }}
                />
              )}
            </Badge>
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 20 }}>
          <Col lg={6} md={1} sm={8} xs={4}>
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
          <Col lg={6} md={1} sm={8} xs={4}>
            <s
              style={{
                fontSize: "1.2em",
                color: "red",
              }}
            >
              {/*productPriceReduced && `${productPriceReduced + "€"}`*/}
              {"5" + "€"}
            </s>
          </Col>

          <Col lg={12} md={21} sm={8} xs={6}>
            <Row justify="end">
              <Tag color={styleVariable.secondaryColor}>{category}</Tag>
            </Row>
          </Col>
        </Row>

        <Row
          onClick={(e) => e.stopPropagation()}
          align="middle"
          style={{ marginTop: 20 }}
        >
          <Col lg={24} md={6} sm={16} xs={16}>
            <Addandremoveproduct
              product={product}
              notification={notification}
              addNotification={addNotification}
            />
          </Col>
          <Row align="middle" justify="space-between" style={{ marginTop: 20 }}>
            <Col lg={23}>
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
            <Col lg={1}>
              <Row align="middle">
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
        </Row>
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
