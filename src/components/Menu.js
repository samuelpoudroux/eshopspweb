import React from "react";
import { Menu, Row, Col, Drawer, Button } from "antd";
import { withRouter } from "react-router";
import logo from "../assets/iconGrey.svg";

import {
  HomeOutlined,
  ContactsOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";
import { upperCase } from "../helpers/UpperCase";
import { useContext } from "react";
import { AppContext } from "../context/context";
const { SubMenu } = Menu;

const NavBar = ({ setMenuIsOpened, menuIsOpened, history }) => {
  const goToPage = (e, url) => {
    localStorage.setItem("menuActive", e.key);
    history.push(url);
    setMenuIsOpened(false);
  };
  const { isMobile } = useResponsive();
  const { auth } = useContext(AppContext);

  const user = localStorage.getItem("users") || null;

  const manageConnection = () => {
    if (user) {
      auth.logout(history);
    } else {
      history.push("/login");
      setMenuIsOpened(false);
    }
  };

  const drawerHeader = () => {
    return (
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <img
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobile ? "110%" : "40%",
              maxHeight: isMobile ? "120%" : "40%",
              cursor: "pointer",
            }}
          />
        </Col>
        <Col span={12}>
          <Button
            style={{
              color: styleVariable.secondaryColor,
              background: "white",
            }}
            onClick={() => manageConnection()}
          >
            {(user && "Se deconnecter") || "Se connecter"}
          </Button>
        </Col>
      </Row>
    );
  };

  const { categories } = useCategory();
  const currentKey = localStorage.getItem("menuActive") || null;
  return (
    <Drawer
      title={drawerHeader()}
      closable={true}
      placement="left"
      width={isMobile ? 310 : 900}
      onClose={() => setMenuIsOpened(false)}
      visible={menuIsOpened}
      height={"auto"}
      key={"top"}
      closable={false}
      bodyStyle={{
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      style={{ zIndex: 26, overflowY: "scroll" }}
      footerStyle={{ padding: "0px" }}
    >
      <Menu
        style={{
          border: "0px",
        }}
        selectedKeys={currentKey}
        mode="inline"
      >
        <Menu.Item
          key="home"
          icon={
            <HomeOutlined
              style={{
                color:
                  currentKey === "home"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1.1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/")}
          style={{ fontSize: "1.1em" }}
        >
          Accueil
        </Menu.Item>
        <Menu.Item
          key="products"
          icon={
            <ShopOutlined
              style={{
                color:
                  currentKey === "products"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1.1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/products")}
          style={{ fontSize: "1.1em" }}
        >
          Nos produits
        </Menu.Item>
        <SubMenu
          key="Categories"
          icon={
            <AppstoreOutlined
              style={{
                fontSize: "1.1em",
                color:
                  currentKey === "Categories"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
              }}
            />
          }
          title="Categories"
          style={{ fontSize: "1.1em", width: !isMobile && "20%" }}
        >
          {categories.list.map((category) => (
            <Menu.Item
              onClick={(e) => goToPage(e, `/categories/${category.name}`)}
              key={category.name}
            >
              {upperCase(category.name)}
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item
          key="contact"
          icon={
            <ContactsOutlined
              style={{
                color:
                  currentKey === "contact"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1.1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/contact")}
          style={{ fontSize: "1.1em" }}
        >
          Contact
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

NavBar.propTypes = {
  setMenuIsOpened: PropTypes.func,
};

export default withRouter(NavBar);
