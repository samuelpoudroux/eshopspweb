import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { notification, Row } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import styleVariable from "./styleVariable";

const PaiementPage = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
  const redirectToLogin = async () => {
    if (!user) {
      history.push(`/login/paiement`);
      notification.open({
        message: `Merci de vous authentifier pour finaliser votre commande ou créer un compte`,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
        duration: 4,
      });
    }
  };

  useEffect(() => {
    redirectToLogin();
  }, []);

  return (
    <Row align="middle" justify="center" style={{ minHeight: "40vh" }}>
      page paiement
    </Row>
  );
};

export default PaiementPage;
