import React from "react";

import { Col, Row } from "antd";
import styleVariable from "../../styleVariable";

const ProductCardResume = ({
  id,
  num,
  productPrice,
  productName,
  stockAvailable,
}) => {
  return (
    <Col xl={24} xs={24}>
      <Row key={id} justify="space-between">
        <Col xl={3} xs={6}>
          <Row justify="center">
            <b
              style={{
                wordBreak: "break-word",
                color: styleVariable.thirdColor,
              }}
            >
              {productName}
            </b>
          </Row>
        </Col>

        <Col xl={21} xs={16}>
          <Row>
            <Col xl={12} xs={12}>
              {stockAvailable && (
                <Row justify="center">
                  <s style={{ color: "red" }}>{num}X</s>
                  <p style={{ marginLeft: 10 }}> {stockAvailable}X</p>
                </Row>
              )}
              {!stockAvailable && (
                <Row justify="center">
                  <p>{num}X</p>
                </Row>
              )}
            </Col>
            <Col xl={12} xs={12}>
              {stockAvailable && (
                <Row justify="center">
                  <s style={{ color: "red" }}> {productPrice * num}€</s>
                  <p style={{ marginLeft: 10 }}>
                    {productPrice * stockAvailable}€
                  </p>
                </Row>
              )}
              {!stockAvailable && (
                <Row justify="center">
                  <p>{productPrice * num}€</p>
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
