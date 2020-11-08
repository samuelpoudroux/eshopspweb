import React, { useContext, useState, useCallback } from "react";
import { Col, Row, Spin } from "antd";
import { AppContext } from "../../context/context";

import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import { useEffect } from "react";
import "../../App.css";
import styleVariable from "../../styleVariable";
import { PageHeader } from "../PageHeader";

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
    <Col span={24}>
      <PageHeader
        action={() => window.history.back()}
        title={<h2 style={{ color: styleVariable.mainColor }}>NOS PRODUITS</h2>}
      />
      <Row
        className="productCard"
        style={{
          marginTop: 20,
        }}
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
                <Col xxl={3} xs={12}>
                  <ProductCard key={product.id} product={product} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Productlist;
