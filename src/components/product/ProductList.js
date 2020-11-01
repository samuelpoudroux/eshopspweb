import React, { useContext, useState, useCallback } from "react";
import { Col, Row, Spin } from "antd";
import { AppContext } from "../../context/context";

import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import { useEffect } from "react";
import "../../App.css";
import styleVariable from "../../styleVariable";
import useResponsive from "../../customHooks/responsiveHook";

const Productlist = () => {
  const { products } = useContext(AppContext);
  const [state, updateState] = useState(true);
  const { isMobile } = useResponsive();

  let productList = products.list;
  // cateorgies select management
  function categoriesHandleChange(values) {
    products.sortByCategories(values, productList);
  }

  useEffect(() => {
    products.getAllProducts();
  }, [state]);

  return (
    <Col span={24}>
      <h3
        style={{
          textAlign: "center",
          color: styleVariable.mainColor,
        }}
      >
        Nos produits
      </h3>

      <Row
        style={{
          border: `1px solid ${styleVariable.mainColor}`,
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
              paddingLeft: "2%",
              paddingRight: "2%",
              justifyContent: "space-evenly",
              minHeight: "30vh",
            }}
            justify="center"
          >
            {productList &&
              productList.length > 0 &&
              !products.notFound &&
              productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Productlist;
