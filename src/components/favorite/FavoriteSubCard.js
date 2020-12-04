import React from "react";
import { upperCase } from "../../helpers/UpperCase";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import { Col, Popconfirm, Row, Image } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import useBasket from "../../customHooks/basketHook";
import styleVariable from "../../styleVariable";
import useProductImages from "../../customHooks/productImage";
import { Unavailable } from "../product/Unavailable";

export const FavoriteSubCard = ({
  product,
  history,
  notClickable,
  removeProductFromFavorites,
  setFavoriteActive,
}) => {
  const { notificationInfo, addNotification } = useBasket();
  const { images } = useProductImages(product.uid);

  const goToProductDetails = async () => {
    history.push(`/productDetails/${product.name}/${product.id}`);
    setFavoriteActive(false);
  };

  return (
    <Col
      lg={9}
      md={11}
      xs={24}
      sm={24}
      style={{
        boxShadow: " 0px  10px 10px rgba(90, 97, 101, 0.7)",
        padding: 15,
        margin: 10,
      }}
    >
      <Unavailable
        placement={{ top: 45, left: 10, transform: "rotate(-5deg)" }}
        stockNumber={product.stockNumber}
        uid={product.uid}
      />
      <Row
        onClick={() => goToProductDetails()}
        key={product.id}
        align="middle"
        style={{
          cursor: !notClickable && "pointer",
        }}
      >
        <Col lg={3} md={6} sm={6} xs={6}>
          {images && images.length > 0 && (
            <Image
              src={images[0].url}
              alt={`image du produit ${product.name}`}
            />
          )}
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

      <Row style={{ paddingTop: 15 }} justify="end" align="bottom">
        <Col xl={2}>
          <Popconfirm
            title={`Souhaitez vous supprimer ce produit de vos coups de coeur`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => removeProductFromFavorites(product)}
          >
            <DeleteOutlined style={{ color: styleVariable.secondaryColor }} />
          </Popconfirm>
        </Col>
      </Row>
    </Col>
  );
};
