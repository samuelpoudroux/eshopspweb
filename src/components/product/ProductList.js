import React, { useContext, useState, useCallback } from "react";
import { Row, Col, Popover } from "antd";
import { AppContext } from "../../context/context";
import { PlusCircleOutlined } from "@ant-design/icons";

import Productcard from "./ProductCard";
import SortProducts from "./SortProducts";
import useIsAdmin from "../../customHooks/isAdminHooks";
import AddNewProduct from "../../form/product/AddNewProduct";
import { useEffect } from "react";

const Productlist = () => {
  const { products } = useContext(AppContext);
  const [addProduct, setAddProduct] = useState(false);
  const [state, updateState] = useState(true);

  const { isAdmin } = useIsAdmin();
  let productList = products.list;
  // cateorgies select management
  function categoriesHandleChange(values) {
    products.sortByCategories(values, productList);
  }

  useEffect(() => {
    products.getAllProducts();
  }, [state]);

  return (
    <div>
      {addProduct && (
        <AddNewProduct
          forceUpdate={updateState}
          setAddProduct={setAddProduct}
        />
      )}
      <Row
        style={{
          border: "1px solid #89ba17",
          marginTop: " 10px",
          padding: "1%",
        }}
        align="middle"
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
        {productList &&
          productList.length > 0 &&
          productList.map((product) => (
            <Productcard key={product.id} product={product} />
          ))}
      </Row>
    </div>
  );
};

export default Productlist;
