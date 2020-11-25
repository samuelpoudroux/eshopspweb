import React, { useContext, useState, useCallback } from "react";
import { Col, Row, Spin } from "antd";
import { AppContext } from "../../context/context";

import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import { useEffect } from "react";
import "../../App.css";
import styleVariable from "../../styleVariable";
import StickyBar from "./StickyBar";
import PageHeader from "../PageHeader";

const Productlist = () => {
  const { products } = useContext(AppContext);
  const [state, updateState] = useState(true);

  let productList = products.list;
  function categoriesHandleChange(values) {
    products.sortByCategories(values, productList);
  }

  useEffect(() => {
    products.getAllProducts();
  }, [state]);

  return (
    <Col span={24} style={{}}>
      <PageHeader title={"NOS PRODUITS"} />
      <StickyBar title="NOS PRODUITS" />
      <Row
        style={{
          marginTop: 20,
          marginBottom: 20,
          position: "relative",
          zIndex: 1,
        }}
        className="productCard"
      >
        <SortProducts
          categoriesHandleChange={categoriesHandleChange}
          products={products}
        />
      </Row>
      <Row
        style={{
          justifyContent: "space-evenly",
          minHeight: "30vh",
          marginTop: 20,
        }}
      >
        <Col span={24}>
          {products.list.length === 0 && !products.notFound && (
            <Row align="middle" justify="center" style={{ height: "10vh" }}>
              <Spin />
            </Row>
          )}
          {products.notFound && products.list.length > 0 && (
            <h2 style={{ textAlign: "center", color: styleVariable.mainColor }}>
              Nous sommes désolé il n'y a pas de produits inférieur à{" "}
              {products.notFound} €
            </h2>
          )}
          <Row
            style={{
              justifyContent: "space-evenly",
              minHeight: "30vh",
            }}
            justify="center"
          >
            {productList &&
              productList.length > 0 &&
              !products.notFound &&
              productList.map((product) => (
                <Col xxl={4} lg={6} xs={17} md={9} sm={9} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Productlist;
