import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import {
  MenuOutlined,
  LoginOutlined,
  LogoutOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { Row, Col, Popover, Badge } from "antd";
import logo from "../assets/logoWhite.svg";
import ProductsNumber from "../components/product/ProductsNumber";
import TotalPrice from "../components/basket/TotalPrice";
import bot from "../assets/bot.svg";
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

  const goToBot = () => {
    var elmnt = document.getElementById("bot");
    elmnt.scrollIntoView();
    setChatActive(true);
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
            <Col lg={2} md={5} xs={5} sm={5}>
              <MenuOutlined
                onClick={() => setMenuIsOpened(!menuIsOpened)}
                style={{ float: "left", fontSize: "28px", color: "white" }}
              />
            </Col>
            <Col lg={15} md={12} xs={15} sm={12}>
              <img
                alt="logo"
                src={logo}
                style={{
                  maxWidth: isMobile ? "100%" : "100%",
                  maxHeight: isMobile ? "100%" : "100%",
                }}
              />
            </Col>
            <Col lg={7} md={7} xs={4} sm={4}>
              <Popover title="Besoin d'aide">
                <RobotOutlined
                  onClick={() => goToBot()}
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
          style={{ marginTop: isMobile && "10%" }}
        >
          <Row justify={!isMobile && "center"} align="middle">
            <Col lg={2} md={4} xs={4} sm={4}>
              <ProductsNumber
                header
                setBasketActive={setBasketActive}
                basketIsActive={basketIsActive}
                BadgeStyle={{ backgroundColor: "#89ba17", color: "white" }}
              />
            </Col>
            <Col lg={2} md={4} xs={4} sm={4}>
              <TotalPrice
                BadgeStyle={{ backgroundColor: "#fff", color: "#89ba17" }}
                basketIsActive={basketIsActive}
                setBasketActive={setBasketActive}
              />
            </Col>
            <Col lg={2} md={4} xs={3} sm={3}>
              <CleanBasket />
            </Col>
            <Col lg={10} md={5} xs={11} sm={11}>
              <p style={{ color: "white", margin: "0", fontSize: "1em" }}>
                {local &&
                  local.firstName &&
                  `Bienvenue ${
                    local.firstName[0].toUpperCase() +
                    local.firstName.substring(1)
                  }`}
              </p>
            </Col>
            <Col lg={2} md={4} xs={2} sm={2}>
              <Row>
                {local && local.isLogged && (
                  <Row align="middle" justify="center">
                    <LogoutOutlined
                      style={iconStyle}
                      onClick={() => logout(history)}
                    />
                  </Row>
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

      <Row style={{ padding: isMobile ? "3%" : "1.5%" }}>
        {isAdmin && <p style={{ margin: 0, color: "white" }}>Administration</p>}
      </Row>
      <Globalsearchinput globalSearchApi={globalSearchApi} />
    </header>
  );
};

export default withRouter(Header);
