import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  LogoutOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { Row, Col, Popover } from "antd";
import logo from "../assets/logoWhite.svg";
import ProductsNumber from "../components/product/ProductsNumber";
import TotalPrice from "../components/basket/TotalPrice";
import NavBar from "./Menu";
import CleanBasket from "../components/basket/CleanBasket";
import Globalsearchinput from "../components/globalSearch/GlobalSearchInput";
import useResponsive from "../customHooks/responsiveHook";
import Axios from "axios";
import { logout } from "../repository/auth";
import useIsAdmin from "../customHooks/isAdminHooks";

const Header = ({
  setBasketActive,
  basketIsActive,
  history,
  setChatActive,
}) => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const { isMobile } = useResponsive();
  const [globalSearchApi, setGlobalSearchApi] = useState();

  const { REACT_APP_API_DOMAIN, REACT_APP_API_GLOBAL_SEARCH } = process.env;

  const iconStyle = { color: "white", marginLeft: "10px" };
  const getGlobalSearchApi = async () => {
    try {
      const { data: globalSearchApi } = await Axios.get(
        REACT_APP_API_DOMAIN + REACT_APP_API_GLOBAL_SEARCH
      );
      setGlobalSearchApi(globalSearchApi);
    } catch (err) {
      console.log("error", err);
    }
  };

  const { isAdmin } = useIsAdmin();

  const local = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
  useEffect(() => {
    getGlobalSearchApi();
  }, []);
  return (
    <header
      style={{
        padding: isMobile ? "3%" : "1.5%",
        background: "#686868",
        width: "100%",
      }}
    >
      {menuIsOpened && <NavBar setMenuIsOpened={setMenuIsOpened} />}
      <Row align="middle" style={{ width: "100%" }}>
        <Col lg={10} md={11} xs={24} sm={24}>
          <Row align="middle" justify="center">
            <Col lg={2} md={1} xs={5} sm={1}>
              <MenuOutlined
                onClick={() => setMenuIsOpened(!menuIsOpened)}
                style={{ float: "left", fontSize: "28px", color: "white" }}
              />
            </Col>
            <Col lg={15} md={15} xs={15} sm={19}>
              <img
                alt="logo"
                src={logo}
                style={{
                  maxWidth: isMobile ? "100%" : "100%",
                  maxHeight: isMobile ? "100%" : "100%",
                }}
              />
            </Col>
            <Col lg={7} md={2} xs={4} sm={4}>
              <Popover title="Besoin d'aide">
                <QqOutlined
                  onClick={() => setChatActive(true)}
                  style={{ fontSize: 50, color: "white" }}
                />
              </Popover>
            </Col>
          </Row>
        </Col>

        <Col
          lg={14}
          md={12}
          xs={24}
          sm={24}
          style={{ marginTop: isMobile && "8%" }}
        >
          <Row justify="center" align="middle">
            <Col lg={2} md={3} xs={3} sm={3}>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", color: "white" }}
                onClick={() => setBasketActive(!basketIsActive)}
              />
            </Col>
            <Col lg={2} md={4} xs={4} sm={4}>
              <ProductsNumber />
            </Col>
            <Col lg={2} md={4} xs={4} sm={4}>
              <TotalPrice />
            </Col>
            <Col lg={2} md={4} xs={4} sm={4}>
              <CleanBasket />
            </Col>
            <Col lg={6} md={5} xs={5} sm={5}>
              <p style={{ color: "white", margin: "0", fontSize: "1em" }}>
                {local &&
                  local.firstName &&
                  `Bienvenue ${
                    local.firstName[0].toUpperCase() +
                    local.firstName.substring(1)
                  }`}
              </p>
            </Col>
            <Col lg={10} md={4} xs={4} sm={4}>
              <Row>
                {local && local.isLogged && (
                  <Row align="middle" justify="center">
                    <LogoutOutlined
                      style={iconStyle}
                      onClick={() => logout(history)}
                    />
                  </Row>
                )}
                {isAdmin && (
                  <p style={{ margin: 0, color: "white" }}>Administration</p>
                )}
                {!local && (
                  <LoginOutlined
                    style={iconStyle}
                    onClick={() => history.push("/login")}
                  />
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Globalsearchinput globalSearchApi={globalSearchApi} />
    </header>
  );
};

export default withRouter(Header);
