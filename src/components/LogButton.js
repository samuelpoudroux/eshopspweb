import React, { useState } from "react";
import { Row, Col, Popover, Button, Divider, Popconfirm } from "antd";
import { upperCase } from "../helpers/UpperCase";
import { logout } from "../repository/auth";

import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import useIsAdmin from "../customHooks/isAdminHooks";
import useResponsive from "../customHooks/responsiveHook";
import styleVariable from "../styleVariable";
import { withRouter } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/context";
import scrollTop from "../repository/scrollTop";

const LogButton = ({ history, placement }) => {
  const [visible, setVisible] = useState(false);
  const { isAdmin } = useIsAdmin();
  const { isMobile } = useResponsive();
  const { appRef, popup, globalSearch } = useContext(AppContext);
  const { search } = globalSearch;
  const { setAddProduct, setAddCategory } = popup;

  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const goToAuth = (url) => {
    history.push(url);
    search("");
    scrollTop(appRef);
  };
  return (
    <Row align="middle" justify="center">
      {user && user.isLogged && (
        <Popover
          placement={placement ? placement : "top"}
          content={
            <Col span={24}>
              <Row style={{ paddingTop: 4 }}>
                <p>
                  Bienvenue{" "}
                  {user.userData && upperCase(user.userData.firstName)}
                </p>
              </Row>
              <Row style={{ paddingTop: 15 }}>
                <Popconfirm
                  title="Souhaitez vous vous déconnecter？"
                  placement={placement || "top"}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                  onConfirm={() => logout(history)}
                >
                  <Button>Se déconnecter</Button>
                </Popconfirm>
                <Button onClick={() => goToAuth("/informations")}>
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
                    <Button onClick={() => setAddCategory(true)}>
                      Ajouter une categorie
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
          placement={placement || "top"}
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
  );
};

export default withRouter(LogButton);
