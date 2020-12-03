import React, { useContext, useState } from "react";
import axios from "axios";
import { Col, Row, Button, notification, Spin, Input, Form } from "antd";
import moment from "moment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { getTotalPrice } from "../../repository/product";
import { SmileOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_ORDER,
  REACT_APP_PAYPAL_CLIENT_ID,
  REACT_APP_PAYPAL_DEVISE,
} = process.env;
const Paiement = ({ current, setCurrent, basketList, stripe }) => {
  const { userData } = JSON.parse(localStorage.getItem("users")) || {};
  const [paid, setPaid] = useState(false);

  const createOrder = (data, actions) => {
    if (getTotalPrice(basketList) == 0.0) {
      return notification.open({
        message: "panier vide",
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 0.1,
          },
        },
      ],
    });
  };
  const sendOrder = async () => {
    let orderDate;
    orderDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    try {
      const body = {
        products: basketList.map((product) => {
          return {
            uid: product.uid,
            num: product.num,
          };
        }),
        userId: userData.id,
        orderDate,
        status: "ongoing",
      };
      const { data } = await axios.post(
        REACT_APP_API_DOMAIN + REACT_APP_API_ORDER + userData.id,
        body
      );
      notification.open({
        message: "paiement effectué",
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      });
      setPaid(true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Row justify="center">
      <Col xxl={6} xs={12}>
        {paid ? (
          <Row justify="center">
            <Col className="productCard" style={{ padding: 40 }}>
              <h2
                style={{
                  color: styleVariable.secondaryColor,
                  textAlign: "center",
                }}
              >
                Paiement réalisé avec succés
              </h2>
              <p>
                Vous pouvez consulter vos commandes via{" "}
                <a
                  href={
                    process.env.REACT_APP_FRONT_URL +
                    process.env.REACT_APP_INFORMATIONS
                  }
                >
                  consulter mes commandes
                </a>{" "}
                ou via la rubrique gestion de mon compte et mes commandes en
                cours
              </p>
              <Col span={24} style={{ marginTop: 30 }}>
                <Row justify="center">
                  <Button
                    style={{
                      background: styleVariable.secondaryColor,
                      color: "white",
                    }}
                    href="/"
                  >
                    Retour à l'accueil
                  </Button>
                </Row>
              </Col>
            </Col>
          </Row>
        ) : (
          <>
            <Row justify="center" style={{ margin: 15 }}>
              <Button onClick={() => setCurrent(current - 1)}>
                Retour au récapitulatif
              </Button>
            </Row>
            <PayPalScriptProvider
              options={{
                "client-id": REACT_APP_PAYPAL_CLIENT_ID,
                currency: REACT_APP_PAYPAL_DEVISE,
              }}
            >
              <PayPalButtons
                style={{
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  height: 40,
                }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={() => sendOrder()}
              />
            </PayPalScriptProvider>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Paiement;
