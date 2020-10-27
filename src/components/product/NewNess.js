import React, { useContext, useState } from "react";
import { Col, Row, Spin, Carousel } from "antd";
import { AppContext } from "../../context/context";
import Productcard from "./ProductCard";
import { useEffect } from "react";
import styleVariable from "../../styleVariable";

const NewNess = () => {
  const { products } = useContext(AppContext);

  const [newNess, setNewNess] = useState([]);

  useEffect(() => {
    const productIsNewNess = products.list.filter((e) => e.newNess === 1);
    setNewNess(productIsNewNess);
  }, [products.list]);

  return (
    <Col lg={24}>
      <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
        Nos nouveautés
      </h3>

      <Carousel
        autoplay
        dots={true}
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          background: "#ref",
          borderRadius: "2px",
          borderRadius: "2px",
          padding: 25,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {newNess.map((product) => (
          <Col>
            <Row justify="center" style={{ paddingBottom: 30 }}>
              <Productcard
                key={product && product.id}
                product={product}
                large={3}
              />
            </Row>
          </Col>
        ))}
      </Carousel>
    </Col>
  );
};

export default NewNess;
