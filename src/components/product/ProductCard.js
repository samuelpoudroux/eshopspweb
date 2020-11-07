import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import { Badge, Tag } from "antd";
import { withRouter } from "react-router";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import Addandremoveproduct from "./AddAndRemoveProduct";
import {
  HeartFilled,
  HeartOutlined,
  CrownFilled,
  CrownOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import useIsAdmin from "../../customHooks/isAdminHooks";
import Axios from "axios";
import styleVariable from "../../styleVariable";
import useBasket from "../../customHooks/basketHook";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";
import { useState } from "react";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT_IS_NEWNESS,
  REACT_APP_API_PRODUCT,
} = process.env;

const ProductCard = ({ product, history, large }) => {
  const { globalSearch, favorites, products } = useContext(AppContext);
  const { isAdmin } = useIsAdmin();
  const { search } = globalSearch;
  const { isMobile } = useResponsive();
  const [num, setNum] = useState(0);
  const { notification, addNotification, renderNotification } = useBasket();

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
      style={{
        background: "#fff",
        borderRadius: "2px",
        position: "relative",
        cursor: "pointer",
        margin: !isMobile && 20,
        marginTop: isMobile && 20,
        padding: 10,
      }}
      key={product.id}
      // className="testCard"
    >
      <StarFilled
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          fontSize: "28px",
          color: styleVariable.secondaryColor,
        }}
      />
      <b
        style={{
          position: "absolute",
          top: 13,
          left: 20,
          zIndex: 2,
          fontSize: "1em",
          color: "white",
        }}
      >
        {notation || 5}
      </b>

      <Col onClick={(e) => goToProductDetails(e)}>
        <Row
          align="middle"
          justify="center"
          style={{ height: "50%", width: "100%" }}
        >
          <img
            alt="Image du produit"
            src={`https://www.123gelules.com/6245-cart_default/vitamine-c-acerola-bio-1000-100-comprimes.jpg`}
            style={{ maxHeight: "100%", maxWidth: "100%", zIndex: 0 }}
          />
        </Row>
        <Row style={{ paddingTop: 5, height: "25px" }} justify="center">
          <b
            style={{
              color: styleVariable.secondaryColor,
              wordBreak: "break-all",
            }}
          >
            {upperCase(name)}
          </b>
        </Row>
        <Row justify="center" style={{ paddingTop: 5, height: "25px" }}>
          <p style={{ margin: 0, wordBreak: "break-all" }}>
            {shortDescription && upperCase(shortDescription)}
          </p>
        </Row>

        <Row
          align="middle"
          justify="center"
          style={{ paddingTop: 5, height: "40px" }}
        >
          <p
            style={{
              fontSize: "1.5em",
              color: styleVariable.secondaryColor,
              margin: 0,
            }}
          >
            {productPrice}€
          </p>
        </Row>
        <Row
          align="middle"
          justify="center"
          style={{ paddingTop: 5, height: "40px" }}
        >
          <Col lg={24} md={24} sm={24} xs={24}>
            <Row align="middle">
              <Addandremoveproduct
                setNum={setNum}
                productList
                product={product}
                notification={notification}
                addNotification={addNotification}
              />
            </Row>
          </Col>
        </Row>
        <Row align="middle" justify="space-between" style={{ marginTop: 20 }}>
          <Col span={24} onClick={(e) => e.stopPropagation()}>
            <Row align="middle" justify="space-around">
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

ProductCard.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(ProductCard);
