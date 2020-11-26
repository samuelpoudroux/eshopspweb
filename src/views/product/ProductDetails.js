import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Col, Row, Carousel, Image, Spin } from "antd";
import Addandremoveproduct from "../../components/product/AddAndRemoveProduct";
import ProductDetailsTabs from "../../components/product/ProductDetailsTabs";
import {
  PaperClipOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";
import StickyBar from "../../components/product/StickyBar";
import useProductImages from "../../customHooks/productImage";
import { Unavailable } from "../../components/product/Unavailable";
import styleVariable from "../../styleVariable";
import { AppContext } from "../../context/context";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { images } = useProductImages(product.uid);
  const { isMobile, isTabletOrMobile } = useResponsive();
  const { favorites } = useContext(AppContext);
  const { uid } = match.params;
  const { REACT_APP_API_DOMAIN, REACT_APP_API_PRODUCT } = process.env;

  const getProduct = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT + `${uid}`
    );
    setProduct(data);
    setIsLoading(false);
  };

  const isFavorites =
    JSON.parse(localStorage.getItem("favorites")) &&
    JSON.parse(localStorage.getItem("favorites")).length > 0 &&
    JSON.parse(localStorage.getItem("favorites")).find(
      (e) => e.uid === product.uid
    )
      ? true
      : false;

  useEffect(() => {
    getProduct();
  }, [uid]);

  return (
    <Col span={24}>
      <StickyBar title={`${product.name && product.name.toUpperCase()}`} />
      <Row justify="center" style={{ padding: 20, paddingTop: 60 }}>
        {isLoading && (
          <Col span={24}>
            <Row justify="center" align="middle">
              <Spin />
            </Row>
          </Col>
        )}
        <Col xxl={12} lg={12} md={12} xs={24}>
          <Row justify="center">
            <Col
              xxl={10}
              lg={18}
              md={24}
              xs={24}
              className="productCard"
              style={{ padding: 20, transform: "rotate(-0.01turn)" }}
            >
              <PaperClipOutlined
                rotate={135}
                style={{
                  position: "absolute",
                  top: -3,
                  left: 10,
                  fontSize: "4em",
                  zIndex: 1,
                }}
              />
              {isFavorites && (
                <HeartFilled
                  style={{
                    fontSize: 24,
                    color: styleVariable.secondaryColor,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                  onClick={() => favorites.removeProductFromFavorites(product)}
                />
              )}
              {!isFavorites && (
                <HeartOutlined
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: styleVariable.secondaryColor,
                    zIndex: 1,
                  }}
                  onClick={() => favorites.addProductToFavorites(product)}
                />
              )}
              <Unavailable
                placement={{ top: 20, right: 10 }}
                stockNumber={product.stockNumber}
              />
              <Carousel autoplay style={{ padding: 40, marginTop: 1 }}>
                {images &&
                  images.length > 0 &&
                  images.map((image) => (
                    <Col key={image.url} span={24}>
                      <Row justify="center" style={{ cursor: "zoom-in" }}>
                        <Image
                          alt={`image du produit ${product.name}`}
                          src={`${image.url}`}
                          height={250}
                          width={250}
                          style={{ zIndex: 0 }}
                        />
                      </Row>
                    </Col>
                  ))}
              </Carousel>

              <Row justify="center" align="middle">
                <h1 style={{ fontStyle: "italic", marginTop: 20 }}>
                  {product.name && upperCase(product.name)}
                </h1>
              </Row>
              <Row align="middle">
                <Col span={19}>
                  <Addandremoveproduct buttonPadding={10} product={product} />
                </Col>

                <Col span={5}>
                  <Row justify={isMobile ? "center " : "end"}>
                    <p style={{ fontSize: "2em" }}>{product.productPrice}€</p>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          xxl={12}
          lg={12}
          md={24}
          xs={24}
          className="productCard"
          style={{ marginTop: isTabletOrMobile && 40 }}
        >
          <ProductDetailsTabs
            description={product.description}
            formule={product.formule}
            advice={product.advice}
            uid={product.uid}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default ProductDetail;
