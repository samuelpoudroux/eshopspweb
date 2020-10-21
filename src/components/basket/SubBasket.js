import React, { useState, useEffect } from "react";
import { Carousel, Badge, Row, Col, Drawer } from "antd";
import ProductsNumber from "../product/ProductsNumber";
import TotalPrice from "./TotalPrice";
import { DownOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import { withRouter } from "react-router";
import RemoveSeveralProducts from "../product/RemoveSeveralProduct";
import ProductNumber from "../product/ProductNumber";
const SubBasket = ({ setBasketActive, basketIsActive, history }) => {
  let num = 0;
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const [subBasketVisible, setSubBasketVisible] = useState(false);
  const { isMobile } = useResponsive();

  const drawerHeader = () => {
    return (
      <Row>
        <Col span={12}>
          <b style={{ fontSize: "1.3em", color: "#686868" }}>Sous total</b>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <ProductsNumber
                header
                BadgeStyle={{ backgroundColor: "#89ba17", color: "white" }}
                iconBasketColor="#686868"
                setBasketActive={setBasketActive}
                basketIsActive={basketIsActive}
              />
            </Col>
            <Col span={12}>
              <TotalPrice
                BadgeStyle={{ backgroundColor: "#89ba17", color: "white" }}
                iconEuroColor="#686868"
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
      <div>
        {list.length > 0 && (
          <DownOutlined
            style={{
              animation: "bounce 0.35s ease infinite alternate",
              marginTop: 20,
              color: "#686868",
              fontSize: "1.3em",
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
            paddingBottom: "0px",
          }}
          style={{ zIndex: 0 }}
          footerStyle={{ padding: "0px" }}
        >
          <Row
            align="middle"
            style={{
              boxShadow:
                "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
              background: "#fff",
              borderRadius: "2px",
            }}
          >
            <Col span={24} style={{ padding: "10px" }}>
              <h3 style={{ textAlign: "center" }}>Produits dans le panier</h3>
              <Carousel autoplay dots={false}>
                {list.map(
                  (product) =>
                    product.num !== 0 && (
                      <Col
                        span={24}
                        style={{
                          padding: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push(`/productDetails/${product.id}`)
                        }
                      >
                        <Row
                          style={{
                            padding: "5px",
                            border: "3px dashed #686868",
                            borderRadius: "2px",
                          }}
                        >
                          <Col lg={23} md={20} sm={24} xs={24}>
                            <Row align="middle">
                              <Col lg={4} md={5} sm={12} xs={12}>
                                <img
                                  style={{ width: "100%" }}
                                  src={product.imageUrl}
                                  alt="image du produit"
                                />
                              </Col>
                              <Col lg={3} md={5} sm={10} xs={10}>
                                <Row justify="center">
                                  <b
                                    style={{
                                      fontSize: "1.3em",
                                      color: "#686868",
                                    }}
                                  >
                                    {product.name}
                                  </b>
                                </Row>
                              </Col>
                              {isMobile && (
                                <Col sm={2} xs={2}>
                                  <Row
                                    style={{ padding: "5px" }}
                                    justify="center"
                                  >
                                    <Badge
                                      style={{
                                        backgroundColor: "#89ba17",
                                        color: "white",
                                      }}
                                      count={`${product.productPrice}€`}
                                    />
                                  </Row>
                                </Col>
                              )}
                              <Col lg={4} md={10} sm={12} xs={12}>
                                <Row>
                                  <ProductNumber product={product} />
                                </Row>
                              </Col>
                              <Col
                                lg={5}
                                md={4}
                                sm={6}
                                xs={6}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Addandremoveproduct product={product} />
                              </Col>
                              <Col lg={2} md={2} sm={4} xs={4}>
                                <Row
                                  style={{ padding: "5px" }}
                                  justify="center"
                                >
                                  <RemoveSeveralProducts product={product} />
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          {!isMobile && (
                            <Col lg={1} md={2} sm={2} xs={2}>
                              <Row style={{ padding: "5px" }} justify="center">
                                <Badge
                                  style={{
                                    backgroundColor: "#89ba17",
                                    color: "white",
                                  }}
                                  count={`${product.productPrice}€`}
                                />
                              </Row>
                            </Col>
                          )}
                        </Row>
                      </Col>
                    )
                )}
              </Carousel>
            </Col>
          </Row>
        </Drawer>
      </div>
    )
  );
};

export default withRouter(SubBasket);
