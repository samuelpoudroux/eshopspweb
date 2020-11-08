import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { withRouter } from "react-router";
import { upperCase } from "../helpers/UpperCase";

import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Row, Col, Popover, Button, Divider } from "antd";
import logo from "../assets/logoWhite.svg";
import test from "./videoplayback.mp4";
import ProductsNumber from "../components/product/ProductsNumber";
import NavBar from "./Menu";
import CleanBasket from "../components/basket/CleanBasket";
import Globalsearchinput from "../components/globalSearch/GlobalSearchInput";
import useResponsive from "../customHooks/responsiveHook";
import Axios from "axios";
import { logout } from "../repository/auth";
import useIsAdmin from "../customHooks/isAdminHooks";
import AddNewProduct from "../form/product/AddNewProduct";
import styleVariable from "../styleVariable";
import FavoriteNumber from "./product/FavoriteNumber";
const { REACT_APP_API_DOMAIN, REACT_APP_API_GLOBAL_SEARCH } = process.env;

const Header = ({
  favoriteIsActive,
  setFavoriteActive,
  history,
  setChatActive,
  setSubBasketVisible,
  subBasketVisible,
  botRef,
}) => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isMobile } = useResponsive();
  const [addProduct, setAddProduct] = useState(false);
  const { products, favorites } = useContext(AppContext);
  const [state, updateState] = useState(true);
  const [update, setUpdate] = useState(false);
  const { isAdmin } = useIsAdmin();
  const [globalSearchApi, setGlobalSearchApi] = useState();

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
    getGlobalSearchApi();
  }, []);
  useEffect(() => {
    products.getAllProducts();
  }, [state]);

  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;

  useEffect(() => {
    setUpdate(!update);
  }, [favorites, isAdmin]);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const goToAuth = (auth) => {
    if (auth === "login") {
      history.push("/login");
    } else if (auth === "register") {
      history.push("/register");
    }
    setVisible(false);
  };
  return (
    <header
      style={{
        position: "relative",
        height: "70vh",
        overflow: "hidden",
        objectFit: "contain",
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
          zIndex: 2,
          padding: "2%",
        }}
      >
        <AddNewProduct
          forceUpdate={updateState}
          setAddProduct={setAddProduct}
          addProduct={addProduct}
        />
        {
          <NavBar
            setMenuIsOpened={setMenuIsOpened}
            menuIsOpened={menuIsOpened}
          />
        }
        <Row style={{ width: "100%" }} align="middle">
          <Col lg={10} md={11} xs={24} sm={24} style={{ height: "10vh" }}>
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
                    maxWidth: isMobile ? "120%" : "60%",
                    maxHeight: isMobile ? "150%" : "60%",
                    cursor: "pointer",
                  }}
                  onClick={() => history.push("/")}
                />
              </Col>
              <Col lg={4} md={4} xs={4} sm={4}>
                <Row justify="center">
                  <Popover title="Besoin d'aide">
                    <MessageOutlined
                      onClick={() => goToBot()}
                      style={{ fontSize: 20, color: "white" }}
                    />
                  </Popover>
                </Row>
              </Col>
              <Col lg={3} md={4} xs={4} sm={4}>
                <Row justify="center">
                  <ContactsOutlined
                    onClick={() => history.push("/contact")}
                    style={{ fontSize: 20, color: "white" }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>

          <Col lg={14} md={12} xs={24} sm={24} style={{ height: "7vh" }}>
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
              <Col lg={4} md={8} xs={3} sm={3}>
                <Row align="middle" justify="center">
                  {user && user.isLogged && (
                    <Popover
                      content={
                        <Col span={24}>
                          <Row style={{ paddingTop: 4 }}>
                            <p>
                              Bienvenue{" "}
                              {user.userData &&
                                upperCase(user.userData.firstName)}
                            </p>
                          </Row>
                          <Row style={{ paddingTop: 15 }}>
                            <Button onClick={() => logout(history)}>
                              {" "}
                              Se Déconnecter
                            </Button>
                            <Button onClick={() => goToAuth("register")}>
                              Gérer mon compte
                            </Button>
                          </Row>

                          {isAdmin && (
                            <>
                              <Divider />
                              <Row
                                style={{
                                  marginTop: isMobile && 20,
                                }}
                                justify="center"
                              >
                                <Button onClick={() => setAddProduct(true)}>
                                  Ajouter un produit
                                </Button>
                              </Row>
                            </>
                          )}
                        </Col>
                      }
                      trigger="click"
                      visible={visible}
                      onVisibleChange={handleVisibleChange}
                    >
                      <UserOutlined
                        style={{
                          color: styleVariable.thirdColor,
                          fontSize: 20,
                        }}
                      />
                    </Popover>
                  )}

                  {!user && (
                    <Popover
                      content={
                        <Col span={24}>
                          <Row style={{ paddingTop: 4 }}>
                            <p>MON COMPTE</p>
                          </Row>
                          <Row style={{ paddingTop: 4 }} justify="center">
                            <Button
                              style={{
                                width: "100%",
                                background: styleVariable.secondaryColor,
                                color: "white",
                              }}
                              icon={<UserOutlined />}
                              onClick={() => goToAuth("login")}
                            >
                              Se connecter
                            </Button>
                          </Row>
                          <Divider className="dividerAuth" />
                          <Row>
                            <b>Vous n'avez pas encore de compte ?</b>
                          </Row>
                          <Row style={{ paddingTop: 4 }} justify="center">
                            <Button
                              style={{ width: "100%" }}
                              onClick={() => goToAuth("register")}
                            >
                              Créer un compte
                            </Button>
                          </Row>
                        </Col>
                      }
                      trigger="click"
                      visible={visible}
                      onVisibleChange={handleVisibleChange}
                    >
                      <UserOutlined style={{ fontSize: 20, color: "white" }} />
                    </Popover>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ height: "60vh" }}>
            <Row style={{ height: "1vh" }} align="middle">
              <Globalsearchinput globalSearchApi={globalSearchApi} />
            </Row>
            <Row style={{ height: "59vh" }} align="middle" justify="center">
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                VOS HUILES MAISONS
              </h1>
            </Row>
          </Col>
        </Row>
      </Col>
    </header>
  );
};

export default withRouter(Header);
