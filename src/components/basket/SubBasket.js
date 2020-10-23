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
          }}
          style={{ zIndex: 0 }}
          footerStyle={{ padding: "0px" }}
        >
          <Col span={24} style={{ padding: "10px" }}>
            <h3 style={{ textAlign: "center" }}>Produits dans le panier</h3>
            <Carousel
              autoplay
              dots={true}
              style={{
                boxShadow:
                  "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                background: "#fff",
                borderRadius: "2px",
                borderRadius: "2px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {list.map(
                (product) =>
                  product.num !== 0 && (
                    <Row
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        history.push(`/productDetails/${product.id}`)
                      }
                    >
                      <Row style={{ paddingBottom: "25px" }}>
                        <Col lg={6} md={12} sm={24} xs={24}>
                          <img
                            style={{
                              width: "100%",
                              height: "250px",
                            }}
                            src={product.imageUrl}
                            alt="image du produit"
                          />
                        </Col>
                        <Col
                          lg={18}
                          md={12}
                          sm={24}
                          xs={24}
                          style={{ padding: "2%" }}
                        >
                          <Row justify="space-between" align="top">
                            <Col lg={20}>
                              <Row>
                                <h1
                                  style={{
                                    color: "#686868",
                                  }}
                                >
                                  {product.name}
                                </h1>
                              </Row>
                              <Row>
                                <b>Prix du produit:</b>
                                <Badge
                                  style={{
                                    backgroundColor: "#89ba17",
                                    color: "white",
                                  }}
                                  count={`${product.productPrice}€`}
                                />
                              </Row>
                            </Col>
                            <Col lg={4}>
                              <Row justify="end">
                                <RemoveSeveralProducts product={product} />
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Culpa nihil unde ullam animi provident laborum
                            nesciunt, tenetur iure suscipit modi doloribus odio
                            ad vitae quaerat aspernatur nisi omnis minus
                            impedit.
                          </Row>
                          <Row
                            style={{ marginTop: !isMobile ? 80 : 10 }}
                            justify={isMobile ? "space-between" : "start"}
                          >
                            <Col lg={4}>
                              <ProductNumber product={product} />
                            </Col>
                            <Col lg={2}>
                              <Addandremoveproduct product={product} />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                  )
              )}
            </Carousel>
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
