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
import { PageHeader } from "../PageHeader";

const NewNess = ({ history }) => {
  const { products } = useContext(AppContext);
  const { isMobile } = useResponsive();
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
      newNessComponents.push(<ProductCard product={product} />);
    });
    setCopy(newNessComponents);
  }, [newNess]);

  return (
    <Col lg={24}>
      <PageHeader
        action={() => window.history.back()}
        title={`Nos nouveautés `}
      />
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
          }}
          onClick={(e) => e.stopPropagation()}
          arrows={true}
        >
          {_.chunk(copy, isMobile ? 1 : 4).map((e) => (
            <Col span={24}>
              <Row justify="space-around" align="middle">
                {" "}
                {!isMobile && (
                  <LeftOutlined
                    style={{
                      fontSize: "30px",
                      color: styleVariable.secondaryColor,
                    }}
                    onClick={() => carrouselRef.current.next()}
                  />
                )}
                {e}
                {!isMobile && (
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
          onClick={() => history.push("/products")}
          style={{ background: styleVariable.secondaryColor, color: "white" }}
        >
          + de produits
        </Button>
      </Row>{" "}
    </Col>
  );
};

export default withRouter(NewNess);
