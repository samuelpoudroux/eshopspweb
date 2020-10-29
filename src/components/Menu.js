import React, { useState } from "react";
import { Menu, Row, Col, Icon } from "antd";
import { withRouter } from "react-router";
import {
  HomeOutlined,
  CloseCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styleVariable from "../styleVariable";

const NavBar = ({ setMenuIsOpened, history }) => {
  const goToPage = (e, url) => {
    localStorage.setItem("menuActive", e.key);
    history.push(url);
    setMenuIsOpened(false);
  };

  const currentKey = localStorage.getItem("menuActive") || null;
  return (
    <Row className="popup">
      <Row className="popup_inner" style={{ padding: "0px", fontSize: "20em" }}>
        <Col
          span={19}
          style={{
            height: "100%",
            background: "red",
          }}
        >
          <Menu
            style={{
              height: "100%",
              paddingTop: "2%",
              border: "0px",
            }}
            selectedKeys={currentKey}
            mode="vertical"
          >
            <Menu.Item
              key="home"
              icon={
                <HomeOutlined
                  style={{
                    color:
                      currentKey === "home"
                        ? "white"
                        : styleVariable.secondaryColor,
                    fontSize: "1.5em",
                  }}
                />
              }
              onClick={(e) => goToPage(e, "/")}
              style={{ fontSize: "1.5em" }}
            >
              Accueil
            </Menu.Item>
            <Menu.Item
              key="products"
              icon={
                <HomeOutlined
                  style={{
                    color:
                      currentKey === "products"
                        ? "white"
                        : styleVariable.secondaryColor,
                    fontSize: "1.5em",
                  }}
                />
              }
              onClick={(e) => goToPage(e, "/products")}
              style={{ fontSize: "1.5em" }}
            >
              Nos produits
            </Menu.Item>
            <Menu.Item
              key="contact"
              icon={
                <ContactsOutlined
                  style={{
                    color:
                      currentKey === "contact"
                        ? "white"
                        : styleVariable.secondaryColor,
                    fontSize: "1.5em",
                  }}
                />
              }
              onClick={(e) => goToPage(e, "/contact")}
              style={{ fontSize: "1.5em" }}
            >
              contact
            </Menu.Item>
          </Menu>
        </Col>
        <Col
          onClick={() => setMenuIsOpened(false)}
          span={5}
          style={{
            paddingTop: "25px",
            height: "100%",
            backgroundColor: styleVariable.secondaryColor,
            margin: 0,
          }}
        >
          <Row justify="center">
            <CloseCircleOutlined
              onClick={() => setMenuIsOpened(false)}
              style={{ color: "white", fontSize: "28px" }}
            />
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

NavBar.propTypes = {
  setMenuIsOpened: PropTypes.func,
};

export default withRouter(NavBar);
