import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import { Tag } from "antd";
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
} from "@ant-design/icons";
import useIsAdmin from "../../customHooks/isAdminHooks";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

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
    color: "red",
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

        <Row>
          <Col
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ wordBreak: "break-all", paddingTop: 15 }}
          >
            <b style={{ color: "#878888" }}>{name}</b>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={1} sm={8} xs={4}>
            <p
              style={{
                fontSize: "1.2em",
                color: "#878888",
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
                color: priceStyle.color,
              }}
            >
              {/*productPriceReduced && `${productPriceReduced + "€"}`*/}
              {"5" + "€"}
            </s>
          </Col>

          <Col lg={12} md={21} sm={8} xs={6}>
            <Row justify="end">
              <Tag color="#89ba17">{category}</Tag>
            </Row>
          </Col>
        </Row>

        <Row onClick={(e) => e.stopPropagation()}>
          <Col lg={24} md={6} sm={16} xs={16}>
            <Addandremoveproduct product={product} />
          </Col>
          <Row align="middle" justify="space-between">
            <Col lg={23}>
              <Row align="middle">
                <ReactStars
                  count={5}
                  value={notation}
                  edit={false}
                  size={24}
                  activeColor="#89ba17"
                />
              </Row>
            </Col>
            <Col lg={1}>
              <Row align="middle">
                {isFavorites && (
                  <HeartFilled
                    style={{ fontSize: 24, color: "#89ba17" }}
                    onClick={() => removeFromFavorites()}
                  />
                )}
                {!isFavorites && (
                  <HeartOutlined
                    style={{ fontSize: 24, color: "#89ba17" }}
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
