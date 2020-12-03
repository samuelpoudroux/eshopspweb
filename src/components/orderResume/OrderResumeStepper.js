import React, { useState, useEffect } from "react";
import { Steps, Button, message, Col, notification, Row } from "antd";
import OrderResume from "./OrderResume";
import styleVariable from "../../styleVariable";
import { SmileOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";
import Paiement from "../paiement/Paiement";
import StickyBar from "../product/StickyBar";
import { useContext } from "react";
import { AppContext } from "../../context/context";

const { Step } = Steps;

const OrderResumeStepper = ({ history, match }) => {
  const { isMobile } = useResponsive();
  const [current, setCurrent] = useState(0);
  const [stripe, setStripe] = useState(null);
  const { basket } = useContext(AppContext);
  const { basketList } = basket;

  const steps = [
    {
      title: "Récapitulatif commande",
      content: <OrderResume basketList={basketList} />,
    },
    {
      title: "Paiement",
      content: (
        <Paiement
          setCurrent={setCurrent}
          current={current}
          basketList={basketList}
        />
      ),
    },
  ];
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;

  const redirectToLoginFormPaiement = async () => {
    if (!user) {
      history.push(`/login/orderResume`);
      notification.open({
        message: `Merci de vous authentifier pour finaliser votre commande ou créer un compte`,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
        duration: 4,
      });
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <Col span={24}>
      <StickyBar title={`RESUMÉ COMMANDE`} />
      <Steps
        style={{ padding: 15 }}
        current={current}
        direction={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Col style={{ padding: 15 }} span={24}>
        {steps[current].content}
      </Col>
      <Row justify="center" className="steps-action">
        {current < steps.length - 1 && (
          <Button
            className="buttonResume"
            style={{
              background: styleVariable.secondaryColor,
              color: "white",
            }}
            onClick={() => redirectToLoginFormPaiement()}
          >
            Payer maintenant
          </Button>
        )}
      </Row>
    </Col>
  );
};

export default OrderResumeStepper;
