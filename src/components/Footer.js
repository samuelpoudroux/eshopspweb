import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Col, Divider, Image, Row } from "antd";
import logo from "../assets/logoWhite.svg";
import useResponsive from "../customHooks/responsiveHook";
import { PHONENUMBER, EMAIL, ADDRESS } from "../constants/contact";
import { HomeOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styleVariable from "../styleVariable";
import { AppContext } from "../context/context";
import scrollTop from "../repository/scrollTop";
import useCategory from "../customHooks/categoryHook";
import { upperCase } from "../helpers/UpperCase";

const Footer = ({ history }) => {
  const { isMobile } = useResponsive();
  const { appRef, globalSearch } = useContext(AppContext);
  const { categories } = useCategory();
  const { search } = globalSearch;

  const goHome = () => {
    scrollTop(appRef);
    history.push("/");
  };

  const goToPage = (e, url) => {
    history.push(url);
    scrollTop(appRef);
    search("");
  };
  return (
    <Col
      style={{
        background: styleVariable.backgroundColorGradient,
        width: "100%",
        padding: "2%",
        paddingBottom: "0%",
      }}
    >
      <Row>
        <Col xxl={8} lg={8} md={8} sm={8} xs={24} justify="space-between">
          <Row justify={isMobile && "center"}>
            <Image
              alt="logo"
              src={logo}
              onClick={() => goHome()}
              style={{
                cursor: "pointer",
              }}
              width={isMobile ? "50%" : "40%"}
              height={isMobile ? "50%" : "40%"}
            />
          </Row>

          <Col xxl={24} xs={24}>
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
        <Col xxl={1} lg={1} sm={24} xs={24} style={{ padding: 20 }}>
          <Divider
            type={!isMobile && "vertical"}
            style={{ backgroundColor: "white", height: "100%" }}
          />
        </Col>
        <Col xxl={7} lg={7} sm={7} md={7} sm={24} xs={24}>
          <Row justify="center">
            <h3 style={{ color: "white" }}>Nos catégories </h3>
          </Row>
          <Row justify="center">
            <Col>
              {categories.list.map((category) => (
                <p
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={(e) => goToPage(e, `/categories/${category.name}`)}
                  key={category.name}
                >
                  {upperCase(category.name)}
                </p>
              ))}
            </Col>
          </Row>
        </Col>
        <Col xxl={1} lg={1} sm={24} xs={24} style={{ padding: 20 }}>
          <Divider
            type={!isMobile && "vertical"}
            style={{ backgroundColor: "white", height: "100%" }}
          />
        </Col>
        <Col xxl={7} sm={24} md={7} xs={24}>
          <Row justify="center">
            <h3 style={{ color: "white" }}>Réseaux sociaux</h3>
          </Row>
          <Row justify="center">
            <Col>
              {categories.list.map((category) => (
                <p
                  style={{ color: "white", cursor: "pointer" }}
                  // onClick={(e) => goToPage(e, `/categories/${category.name}`)}
                  key={category.name}
                >
                  {upperCase("reseau")}
                </p>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        justify="space-between"
        align="bottom"
        style={{ marginTop: 30, height: "15%" }}
      >
        {/*<a style={{ color: "white" }}>Condition d'utilisations</a>
        <a style={{ color: "white" }}>Condition générale de ventes</a>
        <a style={{ color: "white" }}>Cookies</a>
        <a style={{ color: "white" }}>Vos informations personelles</a>*/}
      </Row>
    </Col>
  );
};

Footer.propTypes = {};

export default Footer;
