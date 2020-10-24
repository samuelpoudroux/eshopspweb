import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { withRouter } from "react-router";
import {
  MenuOutlined,
  LoginOutlined,
  LogoutOutlined,
  MessageOutlined,
  ContactsOutlined,
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
import AddNewProduct from "../form/product/AddNewProduct";
import { PlusCircleOutlined } from "@ant-design/icons";
import styleVariable from "../styleVariable";
import FavoriteNumber from "./product/FavoriteNumber";

const Header = ({
  setBasketActive,
  basketIsActive,
  favoriteIsActive,
  setFavoriteActive,
  history,
  setChatActive,
  botRef,
}) => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const { isMobile } = useResponsive();
  const [globalSearchApi, setGlobalSearchApi] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const { products } = useContext(AppContext);
  const [state, updateState] = useState(true);

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
    botRef.current.scrollIntoView();
    setChatActive(true);
  };
  useEffect(() => {
    products.getAllProducts();
  }, [state]);

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
        background: styleVariable.backgroundColorGradient,
        width: "100%",
      }}
    >
      {addProduct && (
        <AddNewProduct
          forceUpdate={updateState}
          setAddProduct={setAddProduct}
        />
      )}
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
            <Col lg={15} md={11} xs={10} sm={10}>
              <img
                alt="logo"
                src={logo}
                style={{
                  maxWidth: isMobile ? "100%" : "100%",
                  maxHeight: isMobile ? "100%" : "100%",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/")}
              />
            </Col>
            <Col lg={4} md={4} xs={4} sm={4}>
              <Popover title="Besoin d'aide">
                <MessageOutlined
                  onClick={() => goToBot()}
                  style={{ fontSize: 50, color: "white" }}
                />
              </Popover>
            </Col>
            <Col lg={3} md={4} xs={5} sm={5}>
              <ContactsOutlined
                onClick={() => history.push("/contact")}
                style={{ fontSize: 50, color: "white" }}
              />
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
          <Row justify="center" align="middle">
            <Col lg={2} md={4} xs={6} sm={6}>
              <ProductsNumber
                header
                setBasketActive={setBasketActive}
                basketIsActive={basketIsActive}
                BadgeStyle={{ backgroundColor: "#89ba17", color: "white" }}
              />
            </Col>
            <Col lg={2} md={4} xs={6} sm={6}>
              <TotalPrice
                BadgeStyle={{ backgroundColor: "#fff", color: "#89ba17" }}
                basketIsActive={basketIsActive}
                setBasketActive={setBasketActive}
              />
            </Col>
            <Col lg={2} md={4} xs={6} sm={6}>
              <FavoriteNumber
                BadgeStyle={{ backgroundColor: "#686868", color: "white" }}
                setFavoriteActive={setFavoriteActive}
                favoriteIsActive={favoriteIsActive}
              />
            </Col>
            <Col lg={2} md={4} xs={6} sm={6}>
              <CleanBasket />
            </Col>
            <Col
              lg={3}
              md={5}
              xs={12}
              sm={12}
              style={{ marginTop: isMobile && 50 }}
            >
              <p style={{ color: "white", margin: "0", fontSize: "1em" }}>
                {local &&
                  local.firstName &&
                  `Bienvenue ${
                    local.firstName[0].toUpperCase() +
                    local.firstName.substring(1)
                  }`}
              </p>
            </Col>
            <Col
              lg={2}
              md={2}
              xs={12}
              sm={12}
              style={{ marginTop: isMobile && 50 }}
            >
              <Row>
                {local && local.isLogged && (
                  <Row justify="center">
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
            {isAdmin && (
              <Col lg={2} md={24} sm={24} xs={24}>
                <Row
                  style={{
                    marginTop: isMobile && 20,
                  }}
                  justify="center"
                >
                  <Popover title="Ajouter un produit">
                    <PlusCircleOutlined
                      onClick={() => setAddProduct(true)}
                      style={{
                        fontSize: "1.5em",
                        color: "white",
                      }}
                    />
                  </Popover>
                  {isAdmin && (
                    <p style={{ margin: 0, color: "white" }}>Administration</p>
                  )}
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Globalsearchinput globalSearchApi={globalSearchApi} />
    </header>
  );
};

export default withRouter(Header);
