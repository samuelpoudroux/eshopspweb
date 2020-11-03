import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Button, Col, notification, Row } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import styleVariable from "./styleVariable";

const CommandResume = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;
  const redirectToLoginFormPaiement = async () => {
    if (!user) {
      history.push(`/login/commandeResume`);
      notification.open({
        message: `Merci de vous authentifier pour finaliser votre commande ou créer un compte`,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
        duration: 4,
      });
    } else {
      history.push("/paiement");
    }
  };

  useEffect(() => {}, []);

  return (
    <Col>
      <h3 style={{ textAlign: "center" }}>Récapitulatif de la commande</h3>
      <Row align="middle" justify="center" style={{ minHeight: "40vh" }}>
        <Col lg={12}>
          <Row justify="center">Résumé de la commande</Row>
        </Col>
        <Col lg={12}>
          <Row justify="center">
            <Button onClick={() => redirectToLoginFormPaiement()}>
              Paiement
            </Button>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CommandResume;
