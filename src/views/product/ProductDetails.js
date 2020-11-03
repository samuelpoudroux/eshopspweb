import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Tag } from "antd";
import Addandremoveproduct from "../../components/product/AddAndRemoveProduct";
import ProductDetailsTabs from "../../components/product/ProductDetailsTabs";
import useBasket from "../../customHooks/basketHook";
import styleVariable from "../../styleVariable";
import { upperCase } from "../../helpers/UpperCase";
import { PageHeader } from "../../components/PageHeader";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const { notification, addNotification } = useBasket();
  const { id } = match.params;
  const { REACT_APP_API_DOMAIN, REACT_APP_API_PRODUCT } = process.env;

  const getProduct = async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT + `${id}`
    );
    setProduct(data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Col span={24} style={{ padding: 10 }}>
      <PageHeader
        action={() => window.history.back()}
        title={`Fiche  produit `}
      />
      <Col
        span={24}
        style={{ marginTop: 25, padding: 25 }}
        className="detailCard"
      >
        <h1
          style={{
            textAlign: "center",
            wordBreak: "break-word",
            color: styleVariable.mainColor,
          }}
        >
          {product.name}
        </h1>
        <Row
          justify="space-around"
          align="middle"
          gutter={[0, 40]}
          style={{ minHeight: "20vh" }}
        >
          <Col>
            <img
              alt="Image du produit"
              src={`${product.imageUrl}`}
              style={{ maxHeight: "250px", maxWidth: "100%" }}
            />
          </Col>
          <Col>
            <Row align="middle">
              <Col lg={24}>
                <Addandremoveproduct
                  notification={notification}
                  addNotification={addNotification}
                  buttonPadding={10}
                  product={product}
                />
              </Col>
            </Row>
          </Col>

          <ProductDetailsTabs
            description={upperCase(product.longDescription)}
          />
          <b style={{ fontSize: "2em" }}>{product.productPrice}€</b>
          <div>
            <Tag color={styleVariable.secondaryColor}>
              {upperCase(product.category)}
            </Tag>
          </div>
        </Row>
      </Col>
    </Col>
  );
};

export default ProductDetail;
