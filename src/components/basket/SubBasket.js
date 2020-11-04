import React from "react";
import { Row, Col, Drawer, Button } from "antd";
import ProductsNumber from "../product/ProductsNumber";
import TotalPrice from "./TotalPrice";
import { DownOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";
import ProductCardSubBasket from "./ProductCardSubBasket";
import { withRouter } from "react-router";
import styleVariable from "../../styleVariable";
import CleanBasket from "./CleanBasket";
import { getTotalPrice } from "../../repository/product";

const SubBasket = ({ history, subBasketVisible, setSubBasketVisible }) => {
  let num = 0;
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const { isMobile } = useResponsive();
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
  const drawerHeader = () => {
    return (
      <Row style={{ paddingTop: "2%" }}>
        <Col lg={8} md={8} sm={8} xs={8}>
          <b
            style={{
              fontSize: isMobile ? "1em" : "1.3em",
              color: styleVariable.mainColor,
            }}
          >
            Sous total
          </b>
        </Col>
        <Col lg={16} md={16} sm={14} xs={16}>
          <Row justify="space-between">
            <Col lg={8} md={8} sm={8} xs={10}>
              <ProductsNumber
                notClickable
                header
                BadgeStyle={{
                  backgroundColor: styleVariable.mainColor,
                  color: "white",
                }}
                iconBasketColor={styleVariable.mainColor}
                setSubBasketVisible={setSubBasketVisible}
                subBasketVisible={subBasketVisible}
              />
            </Col>
            <Col lg={8} md={8} sm={7} xs={10}>
              <TotalPrice
                notClickable
                BadgeStyle={{
                  backgroundColor: styleVariable.secondaryColor,
                  color: "white",
                }}
                subBasketVisible={subBasketVisible}
                setSubBasketVisible={setSubBasketVisible}
              />
            </Col>
            <Col span={4}>
              <Row justify="center">
                <CleanBasket
                  color={styleVariable.secondaryColor}
                  fontSize={"20px"}
                />
              </Row>
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

  const goToPaiement = () => {
    history.push(`/commandeResume/${(user && user.id) || "noId"}`);
    setSubBasketVisible(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Drawer
        title={drawerHeader()}
        closable={true}
        placement="right"
        width={isMobile ? 330 : 900}
        onClose={() => setSubBasketVisible(false)}
        visible={subBasketVisible}
        height={"auto"}
        key={"top"}
        closable={false}
        bodyStyle={{
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
        style={{ zIndex: 26, height: "100%", overflowY: "scroll" }}
        footerStyle={{ padding: "0px" }}
        onTouchMove={() => setSubBasketVisible(false)}
      >
        <Col lg={24} style={{ padding: "10px" }}>
          <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
            Produits dans le panier
          </h3>
          <Row justify={isMobile && "center"}>
            {list && list.length > 0 ? (
              list.map(
                (product) =>
                  product.num !== 0 && (
                    <ProductCardSubBasket
                      key={product.id}
                      product={product}
                      list={list}
                    />
                  )
              )
            ) : (
              <Col span={24}>
                <Row justify="center">
                  <h4>Pas de produits dans votre panier</h4>
                </Row>
              </Col>
            )}
          </Row>
          <Row
            align="middle"
            justify="start"
            style={{ padding: "10px", marginTop: 30 }}
            gutter={(20, 50)}
          >
            <Col lg={6} xs={24}>
              <Row justify={isMobile && "center"}>
                <b style={{ color: styleVariable.mainColor }}>
                  Total de mon panier: {getTotalPrice(list)}€
                </b>
              </Row>
            </Col>
            <Col lg={6} xs={24} style={{ marginTop: isMobile && 30 }}>
              <Row justify="center">
                <Button
                  style={{
                    color: "white",
                    background: styleVariable.secondaryColor,
                  }}
                  disabled={list.length === 0}
                  onClick={() => goToPaiement()}
                >
                  Finaliser ma commande
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Drawer>
    </div>
  );
};
export default withRouter(SubBasket);
