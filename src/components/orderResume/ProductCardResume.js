import React from "react";

import { Col, Image, Row } from "antd";
import styleVariable from "../../styleVariable";
import useProductImages from "../../customHooks/productImage";
import { upperCase } from "../../helpers/UpperCase";
import { Unavailable } from "../product/Unavailable";
import Addandremoveproduct from "../product/AddAndRemoveProduct";

const ProductCardResume = ({ product }) => {
  const { id, num, name, stockNumber, uid } = product;
  const { images } = useProductImages(uid);
  return (
    <Col
      xl={24}
      xs={24}
      className="productCard"
      style={{ padding: 20, position: "relative" }}
    >
      <Row key={id} justify="center" align="middle" gutter={[0, 20]}>
        <Col xl={6} xs={4}>
          {images && images.length > 0 && (
            <Image
              alt={`image du produit ${name}`}
              src={`${images[0].url}`}
              style={{ zIndex: 0 }}
              width={"60%"}
              height={"40%"}
            />
          )}
        </Col>
        <Col xl={6} xs={6}>
          <Row align="middle" justify="center">
            <b
              style={{
                wordBreak: "break-word",
                color: styleVariable.thirdColor,
                fontSize: "1.2em",
              }}
            >
              {upperCase(name)}
            </b>
          </Row>
        </Col>
        <Col xl={12}>
          <Addandremoveproduct product={product} subBasket />
        </Col>
      </Row>
      <Col span={24}>
        <Unavailable
          placement={{ top: -15, left: "40%", transform: "rotate(0deg)" }}
          stockNumber={stockNumber}
          num={num}
        />
      </Col>
    </Col>
  );
};

export default ProductCardResume;
