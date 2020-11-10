import React, { useState, useEffect } from "react";
import { Steps, Button, message, Col, notification, Row } from "antd";
import OrderResume from "./OrderResume";
import styleVariable from "../../styleVariable";
import { SmileOutlined } from "@ant-design/icons";
import useResponsive from "../../customHooks/responsiveHook";

const { Step } = Steps;

const OrderResumeStepper = ({ history, match }) => {
  const { isMobile } = useResponsive();
  const steps = [
    {
      title: "Récapitulatif commande",
      content: <OrderResume />,
    },
    {
      title: "Paiement",
      content: <p>Composant paiement</p>,
    },
  ];
  const [current, setCurrent] = useState(0);
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;

  useEffect(() => {
    if (match.params.id) {
      setCurrent(current + 1);
    }
  }, [match.params.id]);

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

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Col span={24} style={{ padding: 20 }}>
      <Steps current={current} direction={isMobile ? "vertical" : "horizontal"}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
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
        {current === steps.length - 1 && (
          <Button
            className="buttonResume"
            style={{
              background: "none",
              color: styleVariable.secondaryColor,
            }}
            onClick={() => message.success("Processing complete!")}
          >
            Commander
          </Button>
        )}
        {current > 0 && (
          <Button
            className="buttonResume"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Récapitulatif
          </Button>
        )}
      </Row>
    </Col>
  );
};

export default OrderResumeStepper;
