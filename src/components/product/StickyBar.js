import { Col, Row } from "antd";
import React, { useContext } from "react";
import styleVariable from "../../styleVariable";
import { MenuOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/context";
import ProductsNumber from "./ProductsNumber";
import FavoriteNumber from "./FavoriteNumber";
import CleanBasket from "../basket/CleanBasket";
import LogButton from "../LogButton";

const StickyBar = ({ title }) => {
  const { popup } = useContext(AppContext);
  const {
    setMenuIsOpened,
    menuIsOpened,
    setSubBasketVisible,
    subBasketVisible,
  } = popup;

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 2,
        padding: 13,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.801)",
      }}
    >
      <Col xxl={1} xs={3}>
        <Row justify="center">
          <MenuOutlined
            onClick={() => setMenuIsOpened(!menuIsOpened)}
            style={{ float: "left", fontSize: "28px", color: "white" }}
          />
        </Row>
      </Col>

      <Col xxl={17} xs={11}>
        <Row align="middle" justify="center" gutter={[0, 0]}>
          <Col>
            <h3 style={{ color: "white", margin: 0 }}>{title}</h3>
          </Col>
        </Row>
      </Col>
      <Col xxl={6} xs={10}>
        <Row>
          <Col xxl={8} lg={8} md={8} xs={12} sm={6}>
            <ProductsNumber
              header
              setSubBasketVisible={setSubBasketVisible}
              subBasketVisible={subBasketVisible}
              BadgeStyle={{
                backgroundColor: styleVariable.mainColor,
                color: "white",
              }}
            />
          </Col>

          <Col xxl={8} lg={8} md={8} xs={6} sm={3}>
            <CleanBasket />
          </Col>
          <Col xxl={8} lg={8} md={8} xs={6} sm={3}>
            <LogButton placement="bottom" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StickyBar;
