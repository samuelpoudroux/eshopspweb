import React, { useContext, useState } from "react";
import axios from "axios";
import { Col, Row, Button, notification, Spin, Input, Form } from "antd";
import moment from "moment";
import { getTotalPrice } from "../../repository/product";
import { SmileOutlined } from "@ant-design/icons";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import styleVariable from "../../styleVariable";

const { REACT_APP_API_DOMAIN, REACT_APP_PAIEMENT } = process.env;

const Paiement = ({ current, setCurrent, basketList, stripe }) => {
  const [receiptUrl, setReceiptUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const { token } = await stripe.createToken();
      const order = await axios.post(
        REACT_APP_API_DOMAIN + REACT_APP_PAIEMENT,
        {
          amount: getTotalPrice(basketList).toString().replace(".", ""),
          source: token.id,
          receipt_email: "samuel.poudroux@hotmail.fr",
        }
      );

      setReceiptUrl(order.data.charge.receipt_url);
      sendorder();
    } catch (error) {
      console.log("error", error);
    }
  };
  const { userData } = JSON.parse(localStorage.getItem("users")) || {};

  const { REACT_APP_API_DOMAIN, REACT_APP_API_ORDER } = process.env;

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendorder = async () => {
    let orderDate;
    orderDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (getTotalPrice(basketList) == 0.0) {
      return notification.open({
        message: "panier vide",
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col>
      {receiptUrl && (
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
              <span>
                <a
                  href={
                    process.env.REACT_APP_FRONT_URL +
                    process.env.REACT_APP_INFORMATIONS
                  }
                >
                  consulter mes commandes
                </a>
              </span>{" "}
              ou via la rubrique gestion de mon compte et mes commandes en cours{" "}
            </p>
            <Col span={24} style={{ marginTop: 30 }}>
              <Row justify="center">
                <Button
                  style={{
                    background: styleVariable.secondaryColor,
                    color: "white",
                  }}
                  href={receiptUrl}
                  target="_blank"
                >
                  Voir le reçu
                </Button>
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
      )}

      {isLoading && <Spin />}
      {!receiptUrl && (
        <Col span={24}>
          <Row justify="center">
            <form className="productCard" style={{ padding: 50 }}>
              <Row style={{ padding: 10 }}>
                <label>
                  Numéro de la carte
                  <CardNumberElement />
                </label>
              </Row>
              <Row style={{ padding: 10 }}>
                <label>
                  Date d'expiration
                  <CardExpiryElement />
                </label>
              </Row>
              <Row style={{ padding: 10 }}>
                <label>
                  CVC
                  <CardCVCElement />
                </label>
              </Row>

              <Row justify="space-between" style={{ marginTop: 20 }}>
                <Button
                  style={{
                    background: styleVariable.secondaryColor,
                    color: "white",
                  }}
                  onClick={() => prev()}
                >
                  Récapitulatif
                </Button>
                <Button
                  style={{
                    background: styleVariable.secondaryColor,
                    color: "white",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Valider paiement
                </Button>
              </Row>
            </form>
          </Row>
        </Col>
      )}
    </Col>
  );
};

export default injectStripe(Paiement);
