import React from "react";

import { Col, Image, Row } from "antd";
import styleVariable from "../../styleVariable";
import useProductImages from "../../customHooks/productImage";
import { upperCase } from "../../helpers/UpperCase";

const ProductCardResume = ({
  id,
  num,
  productPrice,
  productName,
  stockAvailable,
  uid,
}) => {
  const { images } = useProductImages(uid);

  return (
    <Col xl={12} xs={24} className="productCard" style={{ padding: 20 }}>
      <Row key={id} justify="space-between" align="middle">
        <Col xl={6} xs={6}>
          {images && images.length > 0 && (
            <Image
              alt={`image du produit ${productName}`}
              src={`${images[0].url}`}
              style={{ zIndex: 0 }}
              width={"60%"}
              height={"40%"}
            />
          )}
        </Col>
        <Col xl={12} xs={12}>
          <Row align="middle" justify="center">
            <b
              style={{
                wordBreak: "break-word",
                color: styleVariable.thirdColor,
                fontSize: "1.2em",
              }}
            >
              {upperCase(productName)}
            </b>
          </Row>
        </Col>

        <Col xl={6} xs={6}>
          <Row align="middle" justify="end">
            <Col xl={24} xs={12}>
              {stockAvailable && (
                <Row justify="end">
                  <s style={{ color: "red", fontSize: "1.2em" }}> x{num}</s>
                  <p
                    style={{
                      color: styleVariable.mainColor,
                      marginLeft: 10,
                      fontSize: "1.2em",
                    }}
                  >
                    <span style={{ color: styleVariable.thirdColor }}>x</span>
                    {stockAvailable}
                  </p>
                </Row>
              )}
              {!stockAvailable && (
                <Row justify="end">
                  <p
                    style={{
                      color: styleVariable.mainColor,
                      fontSize: "1.3em",
                    }}
                  >
                    <span style={{ color: styleVariable.thirdColor }}>x</span>
                    {num}
                  </p>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductCardResume;
