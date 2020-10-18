import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

const Footer = (props) => {
  return (
    <Row
      style={{
        background: "#686868",
        width: "100%",
      }}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        col1
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        col2
      </Col>
    </Row>
  );
};

Footer.propTypes = {};

export default Footer;
