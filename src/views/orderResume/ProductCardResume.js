import React from "react";

import { Col, Row } from "antd";
import styleVariable from "../../styleVariable";

const ProductCardResume = ({ id, num, productPrice, productName }) => {
  return (
    <Row key={id}>
      <Col span={15}>
        <b
          style={{
            wordBreak: "break-word",
            color: styleVariable.thirdColor,
          }}
        >
          {productName}
        </b>
      </Col>

      <Col span={4}>
        <p> Qté: {num}</p>
      </Col>
      <Col span={3}>
        <span>{productPrice * num}€</span>
      </Col>
    </Row>
  );
};

export default ProductCardResume;
