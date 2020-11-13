import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import logo from "../assets/logoWhite.svg";
import useResponsive from "../customHooks/responsiveHook";
import { PHONENUMBER, EMAIL, ADDRESS } from "../constants/contact";
import { HomeOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styleVariable from "../styleVariable";
import { AppContext } from "../context/context";
import scrollTop from "../repository/scrollTop";

const Footer = ({ history }) => {
  const { isMobile } = useResponsive();
  const { appRef } = useContext(AppContext);

  const goHome = () => {
    scrollTop(appRef);
    history.push("/");
  };
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
              onClick={() => goHome()}
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
          <Row justify="center">
            <p style={{ color: "white" }}>
              Contenu relatif au catégories ou produits
            </p>
          </Row>
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
