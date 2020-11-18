import React from "react";
import axios from "axios";
import { Col, Row, Button } from "antd";
import moment from "moment";

const Paiement = ({ current, setCurrent, basketList }) => {
  const { userData } = JSON.parse(localStorage.getItem("users")) || {};

  const { REACT_APP_API_DOMAIN, REACT_APP_API_ORDER } = process.env;

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendorder = async () => {
    let orderDate;
    orderDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    try {
      const body = {
        products: JSON.stringify(
          basketList.map((product) => {
            return {
              id: product.id,
              num: product.num,
            };
          })
        ),
        userId: userData.id,
        orderDate,
        status: "ongoing",
      };
      const { data } = await axios.post(
        REACT_APP_API_DOMAIN + REACT_APP_API_ORDER + userData.id,
        body
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("basketList", basketList);

  return (
    <Col>
      <Row justify="center">
        <Button onClick={() => prev()}>Récapitulatif</Button>
        <Button onClick={() => sendorder()}>Valider paiement</Button>
      </Row>
    </Col>
  );
};

export default Paiement;
