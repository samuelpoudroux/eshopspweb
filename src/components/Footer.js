import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import logo from "../assets/logoWhite.svg";
import useResponsive from "../customHooks/responsiveHook";

const Footer = (props) => {
  const { isMobile } = useResponsive();

  return (
    <Row
      style={{
        background: "#686868",
        width: "100%",
        padding: "2%",
      }}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        <Row>
          <img
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobile ? "100%" : "25%",
              maxHeight: isMobile ? "100%" : "25%",
            }}
          />
        </Row>
        <a>Condition d'utilisations</a>
        <a>Condition générale de ventes</a>
        <a>Cookies</a>
        <a>Vos informations personelles</a>
      </Col>
      <Col id="bot" lg={12} md={12} sm={24} xs={24}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40675.06261229756!2d2.9232678538274244!3d50.418905218677295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd33143e8095ab%3A0xf539fc766a47c36e!2sH%C3%A9nin-Beaumont!5e0!3m2!1sfr!2sfr!4v1603208803664!5m2!1sfr!2sfr"
          width="400"
          height="300"
          frameborder="0"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </Col>
    </Row>
  );
};

Footer.propTypes = {};

export default Footer;
