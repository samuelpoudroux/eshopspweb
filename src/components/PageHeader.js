import React from "react";
import { Col, Row, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styleVariable from "../styleVariable";
export const PageHeader = ({ title, action }) => {
  return (
    <Row justify="space-around" align="middle">
      <Col xxl={1} xs={2}>
        <ArrowLeftOutlined
          style={{ fontSize: 20, marginLeft: 20 }}
          onClick={() => action()}
        />
      </Col>
      <Col xxl={23} xs={22}>
        <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
          {title}
        </h3>
      </Col>
    </Row>
  );
};
