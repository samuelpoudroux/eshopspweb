import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Row, Spin } from "antd";
import PropTypes from "prop-types";
import ProductCard from "../../components/product/ProductCard";
import { PageHeader } from "../../components/PageHeader";

const CategoryPage = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState({ active: false, list: [] });
  const [isLoading, setIsLoading] = useState(false);

  const { name: categoryName } = match.params;
  const {
    REACT_APP_API_DOMAIN,
    REACT_APP_API_PRODUCT,
    REACT_APP_API_PRODUCT_BY_CATEGORY,
  } = process.env;

  const sortProductBySearch = async (searchValue) => {
    const values = products.filter(
      (e) =>
        e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (e.shortDescription &&
          e.shortDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase())) ||
        (e.category &&
          e.category.toLowerCase().includes(searchValue.toLowerCase()))
    );

    if (searchValue.length === 0) {
      setSearchResult({ active: false, list: [] });
    }
    if (values.length === 0) {
      setSearchResult({ active: true, list: [] });
    } else {
      setSearchResult({ active: true, list: values });
    }
  };

  const getProductsByCategories = async () => {
    setIsLoading(true);
    const { data } = await Axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_PRODUCT_BY_CATEGORY +
        categoryName
    );
    setProducts(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getProductsByCategories();
  }, [match.params.name]);
  return (
    <Col lg={24} style={{ padding: "1%" }}>
      <PageHeader
        action={() => window.history.back()}
        title={`Nos produits dans la catégorie ${categoryName}`}
      />
      <Col md={24} xs={24} sm={24} lg={24} style={{ marginTop: 20 }}>
        <form
          onSubmit={(e) => console.log(e)}
          className=""
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <input
            style={{
              borderRadius: "8px",
              height: "50px",
              width: "100%",
            }}
            type="text"
            placeholder={`Rechercher un produit dans la catégorie ${categoryName}`}
            name="search"
            onChange={(e) => sortProductBySearch(e.target.value)}
          />
          <button
            style={{
              borderRadius: "8px ",
              width: "90px",
              marginLeft: "-80px",
              height: "50px",
            }}
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </Col>
      <Row align="middle" justify="space-around">
        {isLoading && <Spin />}
        {!isLoading &&
          !searchResult.active &&
          products.length > 0 &&
          products.map((product) => <ProductCard product={product} />)}
        {!isLoading && !searchResult.active && products.length === 0 && (
          <h1>Pas de produits pour cette catégorie</h1>
        )}
        {!isLoading &&
          searchResult.active &&
          searchResult.list.length > 0 &&
          searchResult.list.map((product) => <ProductCard product={product} />)}
        {!isLoading &&
          searchResult.list.length === 0 &&
          searchResult.active && <h1>Pas de résultat</h1>}
      </Row>
    </Col>
  );
};

export default CategoryPage;
