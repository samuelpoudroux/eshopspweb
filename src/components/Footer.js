import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import logo from "../assets/logoWhite.svg";
import useResponsive from "../customHooks/responsiveHook";
import { PHONENUMBER, EMAIL, ADDRESS } from "../constants/contact";
import { HomeOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styleVariable from "../styleVariable";

const Footer = ({ history }) => {
  const { isMobile } = useResponsive();

  return (
    <Col
      style={{
        background: styleVariable.backgroundColorGradient,
        width: "100%",
        padding: "2%",
        paddingBottom: "1%",
      }}
    >
      <Row>
        <Col lg={12} md={12} sm={24} xs={24} justify="space-between">
          <Row justify={isMobile && "center"}>
            <img
              alt="logo"
              src={logo}
              onClick={() => history.push("/")}
              style={{
                maxWidth: isMobile ? "50%" : "25%",
                maxHeight: isMobile ? "50%" : "25%",
                cursor: "pointer",
              }}
            />
          </Row>

          <Col lg={12} xs={24}>
            <address>
              <Row align="middle" style={{ marginTop: 40 }}>
                <Col lg={6} xs={4}>
                  <Row>
                    <HomeOutlined
                      style={{ fontSize: "1.3em", color: "#89ba17" }}
                    />
                  </Row>
                </Col>
                <Col lg={18} xs={20}>
                  <Row>
                    <span style={{ color: "white" }}>{ADDRESS}</span>
                  </Row>
                </Col>

                <br />
              </Row>
              <Row align="middle" style={{ marginTop: 40 }}>
                <Col lg={6} xs={4}>
                  <Row>
                    <MailOutlined
                      style={{ fontSize: "1.3em", color: "#89ba17" }}
                    />
                  </Row>
                </Col>
                <Col lg={18} xs={12}>
                  <Row>
                    <a style={{ color: "white" }} href="mailto:jim@rock.com">
                      {EMAIL}
                    </a>
                  </Row>
                </Col>

                <br />
              </Row>
              <Row align="middle" style={{ marginTop: 40 }}>
                <Col lg={6} xs={4}>
                  <Row>
                    <PhoneOutlined
                      style={{ fontSize: "1.3em", color: "#89ba17" }}
                    />
                  </Row>
                </Col>
                <Col lg={18} xs={12}>
                  <Row>
                    <a style={{ color: "white" }} href="tel:+13115552368">
                      {PHONENUMBER}
                    </a>
                  </Row>
                </Col>
              </Row>
            </address>
          </Col>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
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
      <Row
        justify="space-between"
        align="bottom"
        style={{ marginTop: 30, height: "15%" }}
      >
        <a style={{ color: "white" }}>Condition d'utilisations</a>
        <a style={{ color: "white" }}>Condition générale de ventes</a>
        <a style={{ color: "white" }}>Cookies</a>
        <a style={{ color: "white" }}>Vos informations personelles</a>
      </Row>
    </Col>
  );
};

Footer.propTypes = {};

export default Footer;
