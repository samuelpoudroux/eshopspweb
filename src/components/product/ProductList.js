import React, { useContext, useState, useCallback } from "react";
import { Col, Row, Spin } from "antd";
import { AppContext } from "../../context/context";

import Productcard from "./ProductCard";
import SortProducts from "./SortProducts";
import useIsAdmin from "../../customHooks/isAdminHooks";
import { useEffect } from "react";
import "../../App.css";
import styleVariable from "../../styleVariable";

const Productlist = () => {
  const { products } = useContext(AppContext);
  const [state, updateState] = useState(true);

  let productList = products.list;
  // cateorgies select management
  function categoriesHandleChange(values) {
    products.sortByCategories(values, productList);
  }

  useEffect(() => {
    products.getAllProducts();
  }, [state]);

  return (
    <Col>
      <h3
        style={{
          textAlign: "center",
          marginTop: 20,
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
        }}
        align="middle"
      >
        <Col>
          <Row align="middle" style={{ height: "10vh" }}>
            {products.list.length === 0 && !products.notFound && <Spin />}
          </Row>
          {products.notFound && products.list.length > 0 && (
            <h2 style={{ textAlign: "center", color: styleVariable.mainColor }}>
              Nous sommes désolé il n'y a pas de produits inférieur à{" "}
              {products.notFound} €
            </h2>
          )}
          <Row
            style={{
              paddingLeft: "4%",
              paddingRight: "4%",
              marginTop: 20,
              justifyContent: "space-evenly",
              minHeight: "30vh",
            }}
            justify="center"
          >
            {productList &&
              productList.length > 0 &&
              !products.notFound &&
              productList.map((product) => (
                <Productcard key={product.id} product={product} />
              ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Productlist;
