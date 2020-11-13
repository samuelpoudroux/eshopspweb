import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Carousel, Image } from "antd";
import Addandremoveproduct from "../../components/product/AddAndRemoveProduct";
import ProductDetailsTabs from "../../components/product/ProductDetailsTabs";
import useBasket from "../../customHooks/basketHook";
import { PaperClipOutlined } from "@ant-design/icons";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";
import StickyBar from "../../components/product/StickyBar";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const { notification, addNotification } = useBasket();
  const { isMobile, isTabletOrMobile } = useResponsive();
  const { id } = match.params;
  const {
    REACT_APP_API_DOMAIN,
    REACT_APP_API_PRODUCT,
    REACT_APP_API_IMAGES,
  } = process.env;

  const getProduct = async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT + `${id}`
    );
    setProduct(data);
  };

  const getImages = async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_IMAGES +
        `${product.uid}`
    );
    setImages(data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getImages();
  }, [product]);

  return (
    <Col span={24} style={{}}>
      <StickyBar title={`${product.name && product.name.toUpperCase()}`} />

      <Row justify="center" style={{ padding: 20, paddingTop: 60 }}>
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
                }}
              />
              <Carousel>
                {images &&
                  images.length > 0 &&
                  images.map((image) => (
                    <Col key={image.url} span={24}>
                      <Row justify="center" style={{ cursor: "zoom-in" }}>
                        <Image
                          alt="Image du produit"
                          src={`${image.url}`}
                          style={{ maxHeight: "250px", maxWidth: "250px" }}
                        />
                      </Row>
                    </Col>
                  ))}
              </Carousel>

              <Row justify="center" align="middle">
                <h1 style={{ fontStyle: "italic" }}>
                  {product.name && upperCase(product.name)}
                </h1>
              </Row>
              <Row align="middle">
                <Col span={19}>
                  <Addandremoveproduct
                    notification={notification}
                    addNotification={addNotification}
                    buttonPadding={10}
                    product={product}
                  />
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
          <Row>
            <ProductDetailsTabs
              description={upperCase(product.longDescription)}
            />
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductDetail;
