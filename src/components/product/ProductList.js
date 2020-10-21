import React, { useContext, useState, useCallback } from "react";
import { Col, Row, Spin } from "antd";
import { AppContext } from "../../context/context";

import Productcard from "./ProductCard";
import SortProducts from "./SortProducts";
import useIsAdmin from "../../customHooks/isAdminHooks";
import { useEffect } from "react";

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
      <h3>Nos produits</h3>

      <Row
        style={{
          border: "1px solid #89ba17",
          marginTop: " 10px",
          padding: "1%",
        }}
      >
        <SortProducts
          categoriesHandleChange={categoriesHandleChange}
          products={products}
        />
      </Row>
      <Row
        style={{
          paddingLeft: "4%",
          paddingRight: "4%",
          justifyContent: "space-evenly",
        }}
      >
        {products.list.length === 0 && (
          <Row style={{ marginTop: 150 }}>
            <Spin />{" "}
          </Row>
        )}

        {productList &&
          productList.length > 0 &&
          productList.map((product) => (
            <Productcard key={product.id} product={product} />
          ))}
      </Row>
    </Col>
  );
};

export default Productlist;
