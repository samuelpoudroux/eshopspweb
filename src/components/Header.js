import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { withRouter } from "react-router";

import {
  MenuOutlined,
  WechatOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Row, Col, Popover } from "antd";
import logo from "../assets/logoWhite.svg";
import test from "./videoplayback.mp4";
import ProductsNumber from "../components/product/ProductsNumber";
import CleanBasket from "../components/basket/CleanBasket";
import Globalsearchinput from "../components/globalSearch/GlobalSearchInput";
import useResponsive from "../customHooks/responsiveHook";
import Axios from "axios";
import useIsAdmin from "../customHooks/isAdminHooks";
import AddNewProduct from "../form/product/AddNewProduct";
import styleVariable from "../styleVariable";
import FavoriteNumber from "./product/FavoriteNumber";
import LogButton from "./LogButton";
const { REACT_APP_API_DOMAIN, REACT_APP_API_GLOBAL_SEARCH } = process.env;

const Header = ({ history, botRef }) => {
  const { popup, appRef, globalSearch } = useContext(AppContext);
  const {
    setChatActive,
    setMenuIsOpened,
    menuIsOpened,
    setSubBasketVisible,
    subBasketVisible,
    setFavoriteActive,
    favoriteIsActive,
  } = popup;
  const { isMobile, isBigScreen } = useResponsive();
  const { products, favorites } = useContext(AppContext);
  const [update, setUpdate] = useState(false);
  const { isAdmin } = useIsAdmin();
  const [globalSearchApi, setGlobalSearchApi] = useState();
  const { search } = globalSearch;
  const headerHeight = isBigScreen || isMobile ? 60 : 30;
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
    botRef.current.scrollIntoView();
    setChatActive(true);
  };
  const goContact = () => {
    appRef.current.scrollIntoView();
    search("");
    history.push("/contact");
  };
  useEffect(() => {
    getGlobalSearchApi();
  }, []);

  useEffect(() => {
    setUpdate(!update);
  }, [favorites, isAdmin]);

  const goHome = () => {
    history.push("/");
    search("");
  };
  return (
    <header
      style={{
        position: "relative",
        height: `${headerHeight}vh`,
        objectFit: "contain",
        zIndex: 3,
        background: styleVariable.backgroundColorGradient,
      }}
    >
      <video className="videoTag" autoPlay loop muted>
        <source src={test} type="video/mp4" />
      </video>

      <Col
        className="overlay"
        style={{
          height: "100%",
          zIndex: 3,
          padding: 30,
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col
            lg={10}
            md={11}
            xs={24}
            sm={24}
            style={{ height: `${(25 * headerHeight) / 100}vh` }}
          >
            <Row justify="center">
              <Col lg={2} md={5} xs={5} sm={5}>
                <MenuOutlined
                  onClick={() => setMenuIsOpened(!menuIsOpened)}
                  style={{ float: "left", fontSize: "28px", color: "white" }}
                />
              </Col>
              <Col lg={15} md={11} xs={10} sm={10}>
                <img
                  alt="logo"
                  src={logo}
                  style={{
                    maxWidth: isMobile ? "120%" : "70%",
                    maxHeight: isMobile ? "150%" : "70%",
                    cursor: "pointer",
                  }}
                  onClick={() => goHome()}
                />
              </Col>
              <Col lg={4} md={4} xs={4} sm={4}>
                <Row justify="center">
                  <Popover title="Besoin d'aide">
                    <WechatOutlined
                      onClick={() => goToBot()}
                      style={{ fontSize: 20, color: "white" }}
                    />
                  </Popover>
                </Row>
              </Col>
              <Col lg={3} md={4} xs={4} sm={4}>
                <Row justify="center">
                  <ContactsOutlined
                    onClick={() => goContact()}
                    style={{ fontSize: 20, color: "white" }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            lg={14}
            md={12}
            xs={24}
            sm={24}
            style={{ height: `${(20 * headerHeight) / 100}vh` }}
          >
            <Row justify="center" align="middle">
              <Col lg={3} md={4} xs={6} sm={6}>
                <ProductsNumber
                  header
                  setSubBasketVisible={setSubBasketVisible}
                  subBasketVisible={subBasketVisible}
                  BadgeStyle={{
                    backgroundColor: styleVariable.mainColor,
                    color: "white",
                  }}
                />
              </Col>
              <Col lg={3} md={4} xs={6} sm={6}>
                <FavoriteNumber
                  BadgeStyle={{
                    backgroundColor: styleVariable.mainColor,
                    color: "white",
                  }}
                  setFavoriteActive={setFavoriteActive}
                  favoriteIsActive={favoriteIsActive}
                />
              </Col>
              <Col lg={3} md={4} xs={3} sm={3}>
                <CleanBasket />
              </Col>
              <Col lg={3} md={4} xs={3} sm={3}>
                <LogButton />
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ height: `${(40 * headerHeight) / 100}vh` }}>
            <Row align="middle" justify="center">
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                VOS HUILES MAISONS
              </h1>
            </Row>
            <Row>
              <Globalsearchinput globalSearchApi={globalSearchApi} />
            </Row>
          </Col>
        </Row>
      </Col>
    </header>
  );
};

export default withRouter(Header);
