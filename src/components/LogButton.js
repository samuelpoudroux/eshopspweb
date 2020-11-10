import React, { useState } from "react";
import { Row, Col, Popover, Button, Divider } from "antd";
import { upperCase } from "../helpers/UpperCase";
import { logout } from "../repository/auth";

import { UserOutlined } from "@ant-design/icons";
import useIsAdmin from "../customHooks/isAdminHooks";
import useResponsive from "../customHooks/responsiveHook";
import styleVariable from "../styleVariable";
import { withRouter } from "react-router";

const LogButton = ({ history, placement }) => {
  const [visible, setVisible] = useState(false);
  const { isAdmin } = useIsAdmin();
  const { isMobile } = useResponsive();
  const [addProduct, setAddProduct] = useState(false);

  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
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
                <Button onClick={() => logout(history)}> Se Déconnecter</Button>
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
