import React, { useState, useEffect } from "react";
import { Carousel, Badge, Row, Col, Drawer } from "antd";
import ProductsNumber from "../product/ProductsNumber";
import TotalPrice from "./TotalPrice";
import { DownOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import { withRouter } from "react-router";
import styleVariable from "../../styleVariable";

const SubBasket = ({
  setBasketActive,
  basketIsActive,
  history,
  subBasketVisible,
  setSubBasketVisible,
}) => {
  let num = 0;
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const [notification, addNotification] = useState(false);
  const { isMobile } = useResponsive();

  const drawerHeader = () => {
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <b style={{ fontSize: "1.3em", color: styleVariable.mainColor }}>
            Sous total
          </b>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row justify="space-between">
            <Col lg={12} md={12} sm={12} xs={12}>
              <ProductsNumber
                header
                BadgeStyle={{
                  backgroundColor: styleVariable.secondaryColor,
                  color: "white",
                }}
                iconBasketColor={styleVariable.mainColor}
                setBasketActive={setBasketActive}
                basketIsActive={basketIsActive}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <TotalPrice
                BadgeStyle={{
                  backgroundColor: styleVariable.secondaryColor,
                  color: "white",
                }}
                iconEuroColor={styleVariable.mainColor}
                basketIsActive={basketIsActive}
                setBasketActive={setBasketActive}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  const productInBasket =
    list.length > 0 &&
    list.reduce((accumulateur, valeurCourante) => {
      return accumulateur + valeurCourante.num * valeurCourante.productPrice;
    }, num);
  return (
    list.length > 0 &&
    productInBasket !== 0 && (
      <div style={{ textAlign: "center" }}>
        {list.length > 0 && (
          <DownOutlined
            style={{
              animation: "bounce 0.35s ease infinite alternate",
              marginTop: 20,
              color: styleVariable.mainColor,
              fontSize: "1.3em",
              overflowY: isMobile && "scroll",
            }}
            onClick={() => setSubBasketVisible(true)}
          />
        )}

        <Drawer
          title={drawerHeader()}
          placement={"top"}
          closable={true}
          onClose={() => setSubBasketVisible(false)}
          visible={subBasketVisible}
          height={"auto"}
          key={"top"}
          bodyStyle={{
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          style={{ zIndex: 0 }}
          footerStyle={{ padding: "0px" }}
        >
          <Col lg={24} style={{ padding: "10px" }}>
            <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
              Produits dans le panier
            </h3>
            <Row>
              {list.map(
                (product) =>
                  product.num !== 0 && (
                    <Col
                      lg={6}
                      md={11}
                      xs={24}
                      sm={24}
                      style={{
                        boxShadow: " 0px  10px 10px rgba(90, 97, 101, 0.7)",
                        padding: 5,
                        margin: 5,
                      }}
                    >
                      <Row
                        onClick={() =>
                          history.push(`/productDetails/${product.id}`)
                        }
                        key={product.id}
                        style={{
                          cursor: "pointer",
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
                              <Row
                                style={{ wordBreak: "break-word" }}
                                justify="center"
                              >
                                <b
                                  style={{
                                    color: styleVariable.mainColor,
                                  }}
                                >
                                  {product.name}
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

                      <Row style={{ padding: 5 }}>
                        <Col lg={24}>
                          <Addandremoveproduct
                            notification={notification}
                            addNotification={addNotification}
                            product={product}
                          />
                        </Col>
                      </Row>
                    </Col>
                  )
              )}
            </Row>
          </Col>
        </Drawer>
      </div>
    )
  );
};

// {product.shortDescription
//   ? product.shortDescription
//   : "Pas de description pour ce produit"}
export default withRouter(SubBasket);
