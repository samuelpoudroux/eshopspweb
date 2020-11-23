import React, { useContext, useRef, useState } from "react";
import _ from "lodash";
import { Col, Row, Spin, Carousel, Button } from "antd";
import { withRouter } from "react-router";
import { AppContext } from "../../context/context";
import { useEffect } from "react";
import styleVariable from "../../styleVariable";
import ProductCard from "./ProductCard";
import useResponsive from "../../customHooks/responsiveHook";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import scrollTop from "../../repository/scrollTop";

const NewNess = ({ history }) => {
  const { products, appRef } = useContext(AppContext);
  const { isMobile, isBigScreen, isDesktopOrLaptop } = useResponsive();

  const carrouselRef = useRef();

  const [newNess, setNewNess] = useState([]);
  const [copy, setCopy] = useState([]);
  useEffect(() => {
    const productIsNewNess = products.list.filter((e) => e.newNess === 1);
    setNewNess(productIsNewNess);
  }, [products.list]);

  useEffect(() => {
    const newNessComponents = [];
    newNess.map((product) => {
      newNessComponents.push(
        <Col xs={12} lg={10} md={10} xxl={5} key={product.id}>
          <ProductCard productList product={product} />
        </Col>
      );
    });
    setCopy(newNessComponents);
  }, [newNess]);

  const goProductPage = () => {
    history.push("/products");
    scrollTop(appRef);
  };

  return (
    <Col style={{ margin: 0, overflow: "hidden" }}>
      <h2 style={{ textAlign: "center", color: styleVariable.mainColor }}>
        NOS NOUVEAUTÉS
      </h2>
      {newNess.length === 0 && (
        <Row style={{ minHeight: "30vh" }} justify="center" align="middle">
          <Spin />
        </Row>
      )}
      {newNess.length > 0 && (
        <Carousel
          ref={carrouselRef}
          autoplay
          dots={true}
          style={{
            background: "#ref",
            borderRadius: "2px",
            borderRadius: "2px",
            paddingBottom: 25,
            marginTop: 10,
          }}
          onClick={(e) => e.stopPropagation()}
          arrows={true}
        >
          {_.chunk(
            copy,
            isMobile ? 1 : isDesktopOrLaptop ? 3 : isBigScreen ? 6 : 6
          ).map((e) => (
            <Col span={24} key={e}>
              <Row justify="space-around" align="middle">
                {!isMobile && isDesktopOrLaptop && (
                  <LeftOutlined
                    style={{
                      fontSize: "30px",
                      color: styleVariable.secondaryColor,
                    }}
                    onClick={() => carrouselRef.current.next()}
                  />
                )}
                {e}
                {!isMobile && isDesktopOrLaptop && (
                  <RightOutlined
                    style={{
                      fontSize: "30px",
                      color: styleVariable.secondaryColor,
                    }}
                    onClick={() => carrouselRef.current.next()}
                  />
                )}
              </Row>
            </Col>
          ))}
        </Carousel>
      )}
      <Row justify="center">
        <Button
          onClick={() => goProductPage()}
          style={{ background: styleVariable.secondaryColor, color: "white" }}
        >
          + de produits
        </Button>
      </Row>{" "}
    </Col>
  );
};

export default withRouter(NewNess);
