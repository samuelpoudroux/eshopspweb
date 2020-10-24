import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import { Tag } from "antd";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Addandremoveproduct from "./AddAndRemoveProduct";
import useResponsive from "../../customHooks/responsiveHook";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";

const Productcard = ({ product, history }) => {
  const { globalSearch, favorites } = useContext(AppContext);
  const { search } = globalSearch;
  const { isMobile } = useResponsive();
  const [isFavorites, setIsFavorites] = useState(false);
  const productIsInFavorites =
    (JSON.parse(localStorage.getItem("favorites")) &&
      JSON.parse(localStorage.getItem("favorites")).find(
        (e) => e.id === product.id
      )) ||
    null;
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
    setIsFavorites(true);
    favorites.addProductToFavorites(product);
  };
  const removeFromFavorites = () => {
    setIsFavorites(false);
    favorites.removeProductFromFavorites(product);
  };

  return (
    <Col
      xs={20}
      sm={20}
      md={24}
      lg={2}
      style={{
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        background: "#fff",
        borderRadius: "2px",
        position: "relative",
        cursor: "pointer",
        padding: "1px",
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

        <Row justify={isMobile && "center"}>
          <Col lg={3} md={1} sm={8} xs={4}>
            <b style={{ color: "#878888" }}>{name}</b>
          </Col>
        </Row>
        <Row justify={isMobile && "center"}>
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

        <Row
          justify={isMobile && "center"}
          onClick={(e) => e.stopPropagation()}
        >
          <Col lg={24} md={6} sm={16} xs={16}>
            <Addandremoveproduct product={product} />
          </Col>
          <Row align="middle">
            <Col lg={23}>
              <ReactStars
                count={5}
                value={notation}
                edit={false}
                size={24}
                activeColor="#89ba17"
              />
            </Col>
            <Col lg={1}>
              {isFavorites && (
                <HeartFilled onClick={() => removeFromFavorites()} />
              )}
              {!isFavorites && <HeartOutlined onClick={() => addFavorites()} />}
            </Col>
          </Row>
        </Row>
      </Col>
    </Col>
  );
};

Productcard.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Productcard);
