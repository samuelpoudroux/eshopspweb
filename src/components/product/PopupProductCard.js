import React, { useContext } from "react";
import { Col, Image, Row } from "antd";
import useBasket from "../../customHooks/basketHook";
import Addandremoveproduct from "./AddAndRemoveProduct";
import styleVariable from "../../styleVariable";
import { upperCase } from "../../helpers/UpperCase";
import useProductImages from "../../customHooks/productImage";
import { AppContext } from "../../context/context";
import { Unavailable } from "./Unavailable";

const PopupProductCard = ({ product, history, orderEverSent }) => {
  const { notification, addNotification, renderNotification } = useBasket();
  const { images } = useProductImages(product.uid);
  const { popup } = useContext(AppContext);

  const { setSubBasketVisible } = popup;

  const goToProductDetails = async () => {
    history.push(`/productDetails/${product.id}`);
    setSubBasketVisible(false);
  };
  return (
    <Col
      lg={8}
      md={11}
      xs={24}
      sm={24}
      style={{
        boxShadow: " 0px  10px 10px rgba(90, 97, 101, 0.7)",
        padding: 5,
        margin: 10,
        cursor: "pointer",
      }}
      onClick={() => goToProductDetails()}
    >
      <Unavailable
        placement={{ top: 30, right: 10 }}
        stockNumber={product.stockNumber}
      />
      <Row key={product.id} align="middle" style={{}}>
        <Col lg={3} md={6} sm={6} xs={6}>
          {images && images.length > 0 && (
            <Image src={images[0].url} alt="image du produit" />
          )}
        </Col>
        <Col lg={21} md={18} sm={18} xs={18}>
          <Row>
            <Col lg={20} md={18} sm={18} xs={18}>
              <Row
                justify="center"
                align="middle"
                style={{
                  wordBreak: "break-word",
                  marginLeft: 15,
                }}
              >
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

      <Row style={{ paddingTop: 20 }} align="middle" justify="space-between">
        {!orderEverSent && (
          <Addandremoveproduct
            notification={notification}
            addNotification={addNotification}
            product={product}
            subBasket
          />
        )}
      </Row>
      <Row
        justify={!orderEverSent ? "end" : "space-between"}
        align="center"
        style={{ padding: 10 }}
      >
        {orderEverSent && <b>{product.num} Piéces</b>}
        <b>Sous Total: {product.num * product.productPrice}€</b>
      </Row>
    </Col>
  );
};

export default PopupProductCard;
