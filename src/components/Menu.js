import React from "react";
import { Menu, Row, Col, Drawer, Button } from "antd";
import { withRouter } from "react-router";
import logo from "../assets/iconGrey.svg";

import {
  ThunderboltOutlined,
  ContactsOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ContainerOutlined,
  CodeSandboxOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";
import { upperCase } from "../helpers/UpperCase";
import { useContext } from "react";
import { AppContext } from "../context/context";
import scrollTop from "../repository/scrollTop";
const { SubMenu } = Menu;

const NavBar = ({ history }) => {
  const { categories } = useCategory();
  const { isMobile } = useResponsive();
  const { auth, popup, appRef, globalSearch } = useContext(AppContext);
  const { setMenuIsOpened, menuIsOpened } = popup;
  const { search } = globalSearch;

  const user = localStorage.getItem("users") || null;

  const goToPage = (e, url) => {
    localStorage.setItem("menuActive", e.key);
    history.push(url);
    setMenuIsOpened(false);
    scrollTop(appRef);
    search("");
  };
  const manageConnection = (register) => {
    if (register) {
      history.push("/register");
      setMenuIsOpened(false);
      scrollTop(appRef);
      search("");
    } else if (!register && user) {
      auth.logout(history);
      scrollTop(appRef);
      search("");
    } else {
      history.push("/login");
      setMenuIsOpened(false);
      scrollTop(appRef);
      search("");
    }
  };

  const goToInformationManagement = () => {
    history.push("/informations");
    setMenuIsOpened(false);
    scrollTop(appRef);
    search("");
  };

  const goHome = () => {
    history.push("/");
    scrollTop(appRef);
    search("");
    setMenuIsOpened(false);
  };

  const drawerHeader = () => {
    return (
      <Row justify="space-between" align="middle">
        <Col xxl={12} lg={12} xs={24} sm={12}>
          <img
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobile ? "110%" : "40%",
              maxHeight: isMobile ? "120%" : "40%",
              cursor: "pointer",
            }}
            onClick={() => goHome()}
          />
        </Col>
        <Col xxl={10} lg={12} xs={24} sm={12}>
          <Row
            className="menuAction"
            justify="space-around"
            style={{ marginTop: isMobile && 20 }}
          >
            {user && (
              <>
                <Button
                  style={{
                    color: styleVariable.secondaryColor,
                    background: "white",
                  }}
                  onClick={() => manageConnection()}
                >
                  {user && "Se deconnecter"}
                </Button>
                <Button
                  style={{
                    color: styleVariable.secondaryColor,
                    background: "white",
                  }}
                  onClick={() => goToInformationManagement()}
                >
                  Gérer mon compte
                </Button>
              </>
            )}
            {!user && (
              <>
                <Button
                  style={{
                    color: styleVariable.secondaryColor,
                    background: "white",
                  }}
                  onClick={() => manageConnection()}
                >
                  {(user && "Se deconnecter") || "Se connecter"}
                </Button>
                <Button
                  style={{
                    color: styleVariable.secondaryColor,
                    background: "white",
                  }}
                  onClick={() => manageConnection("register")}
                >
                  Créer un compte
                </Button>
              </>
            )}
          </Row>
        </Col>
      </Row>
    );
  };

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
        paddingLeft: "0px",
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
            <ThunderboltOutlined
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
          style={{ marginTop: 20, fontSize: "1.1em" }}
        >
          NOS NOUVEAUTÉS
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
          style={{ marginTop: 20, fontSize: "1.1em" }}
        >
          NOS PRODUITS
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
          title="CATÉGORIES"
          style={{
            marginTop: 20,
            fontSize: "1.1em",
            width: !isMobile && "30%",
          }}
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
                fontSize: "1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/contact")}
          style={{ marginTop: 20, fontSize: "1em" }}
        >
          Contact
        </Menu.Item>
        {user && (
          <Menu.Item
            key="accountManagement"
            icon={
              <AccountBookOutlined
                style={{
                  color:
                    currentKey === "accountManagement"
                      ? "#89ba17"
                      : styleVariable.secondaryColor,
                  fontSize: "1em",
                }}
              />
            }
            onClick={(e) => goToPage(e, "/informations")}
            style={{ marginTop: 20, fontSize: "1em" }}
          >
            Gérer mon compte
          </Menu.Item>
        )}
        {/*
        <Menu.Item
          key="generalCondition"
          icon={
            <ContainerOutlined
              style={{
                color:
                  currentKey === "generalCondition"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/condition-generales-de-ventes")}
          style={{ marginTop: 20, fontSize: "1em" }}
        >
          Conditions générales de ventes
        </Menu.Item>
        <Menu.Item
          key="confidencePolicy"
          icon={
            <CodeSandboxOutlined
              style={{
                color:
                  currentKey === "confidencePolicy"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/politique-de-confidentialite")}
          style={{ marginTop: 20, fontSize: "1em" }}
        >
          Politique de confidentialité
        </Menu.Item>
        <Menu.Item
          key="legalNotice"
          icon={
            <ContactsOutlined
              style={{
                color:
                  currentKey === "legalNotice"
                    ? "#89ba17"
                    : styleVariable.secondaryColor,
                fontSize: "1em",
              }}
            />
          }
          onClick={(e) => goToPage(e, "/mention-legales")}
          style={{ marginTop: 20, fontSize: "1em" }}
        >
          Mentions légales
        </Menu.Item>*/}
      </Menu>
    </Drawer>
  );
};

NavBar.propTypes = {
  setMenuIsOpened: PropTypes.func,
};

export default withRouter(NavBar);
