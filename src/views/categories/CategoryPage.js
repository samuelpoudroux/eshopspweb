import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Input, Row, Spin } from "antd";
import ProductCard from "../../components/product/ProductCard";
import { PageHeader } from "../../components/PageHeader";
import styleVariable from "../../styleVariable";
import { SearchOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";
import StickyBar from "../../components/product/StickyBar";

const CategoryPage = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState({ active: false, list: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useResponsive();

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
    <Col lg={24}>
      <PageHeader
        action={() => window.history.back()}
        title={`${categoryName}`}
      />
      <StickyBar title={categoryName} />

      <Col span={24} style={{ margin: 20 }}>
        <form
          onSubmit={(e) => console.log(e)}
          className=""
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <Input
            className="inputStyle"
            style={{
              borderRadius: "8px",
              height: "50px",
            }}
            type="text"
            placeholder={`Rechercher un produit dans la catégorie`}
            name="search"
            onChange={(e) => sortProductBySearch(e.target.value)}
            suffix={
              <SearchOutlined style={{ color: styleVariable.mainColor }} />
            }
          />
        </form>
      </Col>
      <Row align="middle" justify={"center"}>
        {isLoading && <Spin />}
        {!isLoading &&
          !searchResult.active &&
          products.length > 0 &&
          products.map((product) => (
            <Col xxl={3} xs={12} md={7}>
              <ProductCard product={product} />{" "}
            </Col>
          ))}
        {!isLoading && !searchResult.active && products.length === 0 && (
          <i style={{ textAlign: "center" }}>
            Pas de produits pour cette catégorie
          </i>
        )}
        {!isLoading &&
          searchResult.active &&
          searchResult.list.length > 0 &&
          searchResult.list.map((product) => (
            <Col xxl={3} xs={17} md={7}>
              <ProductCard product={product} />
            </Col>
          ))}
        {!isLoading &&
          searchResult.list.length === 0 &&
          searchResult.active && (
            <i style={{ textAlign: "center" }}>
              Pas de résultat pour cette catégorie
            </i>
          )}
      </Row>
    </Col>
  );
};

export default CategoryPage;
