import React from "react";
import { Row, Col } from "antd";
import { Carousel, Card } from "antd";

const SubBasket = () => {
  let num = 0;

  const list = JSON.parse(localStorage.getItem("basket")) || [];
  const productInBasket =
    list.length > 0 &&
    list.reduce((accumulateur, valeurCourante) => {
      return accumulateur + valeurCourante.num * valeurCourante.productPrice;
    }, num);
  return (
    list.length > 0 &&
    productInBasket !== 0 && (
      <Row
        align="middle"
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          background: "#fff",
          borderRadius: "2px",
        }}
      >
        <Col span={1}>
          <b>Sous total:</b>
        </Col>
        <Col span={2}>
          <p style={{ margin: "0", color: "red" }}>
            {list.length} types de produits dans le panier
          </p>
        </Col>
        <Col span={21}>
          <Carousel autoplay>
            {list.map(
              (product) =>
                product.num !== 0 && (
                  <Card>
                    <Row justify="center" align="middle">
                      <Col lg={1} md={1} sm={4} xs={4}>
                        <img
                          style={{ width: "100%" }}
                          src={product.imageUrl}
                          alt="image du produit"
                        />
                      </Col>
                      <Col lg={1} md={1} sm={5} xs={4}>
                        <p>{product.name}</p>
                      </Col>
                      <Col lg={1} md={1} sm={5} xs={4}>
                        <p>{product.num} pièces</p>
                      </Col>
                      <Col lg={1} md={1} sm={5} xs={4}>
                        <p>{product.productPrice} pièces</p>
                      </Col>
                      <Col lg={1} md={1} sm={5} xs={4}>
                        <p>
                          {product.num * product.productPrice} € de produits
                        </p>
                      </Col>
                    </Row>
                  </Card>
                )
            )}
          </Carousel>
        </Col>
      </Row>
    )
  );
};

export default SubBasket;
