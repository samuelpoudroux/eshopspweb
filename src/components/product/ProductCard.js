import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/context";
import { Badge, Image } from "antd";
import { withRouter } from "react-router";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
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
import NewNessIcon from "./NewNessIcon";
import scrollTop from "../../repository/scrollTop";
import useProductImages from "../../customHooks/productImage";
import { Unavailable } from "./Unavailable";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT_IS_NEWNESS,
  REACT_APP_API_PRODUCT,
} = process.env;

const ProductCard = ({ product, history, large }) => {
  const { globalSearch, favorites, products, appRef, basket } = useContext(
    AppContext
  );
  const { isAdmin } = useIsAdmin();
  const { search } = globalSearch;
  const { isMobile } = useResponsive();
  const [num, setNum] = useState(0);
  const { images } = useProductImages(product.uid);
  const { basketList } = basket;
  useEffect(() => {
    setNum(
      (basketList &&
        basketList.find((p) => p.uid === product.uid) &&
        basketList.find((p) => p.uid === product.uid).num) ||
        0
    );
  }, [basketList]);
  const isFavorites =
    JSON.parse(localStorage.getItem("favorites")) &&
    JSON.parse(localStorage.getItem("favorites")).length > 0 &&
    JSON.parse(localStorage.getItem("favorites")).find(
      (e) => e.uid === product.uid
    )
      ? true
      : false;
  const {
    id,
    uid,
    name,
    notation,
    productPrice,
    shortDescription,
    newNess,
    stockNumber,
  } = product;

  const goToProductDetails = (e) => {
    search("");
    scrollTop(appRef);
    history.push(`/productDetails/${name}/${uid}`);
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
        uid,
      { newNess: value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtData")}`,
        },
      }
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
        textAlign: "center",
        // border: "1px solid black",
      }}
      className="productCard"
    >
      {newNess === 0 && notation && (
        <>
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
              top: 18,
              left: 18,
              zIndex: 2,
              fontSize: "8px",
              color: "white",
            }}
          >
            {notation && `${notation}/5`}
          </b>
        </>
      )}{" "}
      {newNess !== 0 && (
        <>
          <NewNessIcon
            height={"50px"}
            style={{
              position: "absolute",
              top: 1,
              left: 10,
              zIndex: 1,
              color: "yellow",
            }}
          />
          <b
            style={{
              position: "absolute",
              top: 20,
              left: 27,
              zIndex: 1,
              fontSize: "8px",
              color: "white",
            }}
          >
            {"New"}
          </b>
        </>
      )}
      <Unavailable
        placement={{ top: 20, right: 10 }}
        stockNumber={stockNumber}
      />
      <Col onClick={(e) => goToProductDetails(e)}>
        <Row
          align="middle"
          justify="center"
          style={{ height: "150px", paddingTop: 10 }}
        >
          {images && images.length > 0 && (
            <Col xxl={12} xs={20}>
              <Image
                alt={`image du produit ${product.name}`}
                src={`${images[0].url}`}
                height={"100%"}
                width={"100%"}
                style={{ zIndex: 0 }}
              />
            </Col>
          )}
        </Row>
        <Row style={{ paddingTop: 20, height: "40px" }} justify="center">
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
          <Col lg={12} md={12} sm={24} xs={15}>
            <Row align="middle" onClick={(e) => e.stopPropagation()}>
              <Addandremoveproduct
                setNum={setNum}
                productList
                product={product}
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
