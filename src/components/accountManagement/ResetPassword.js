import React, { useEffect } from "react";
import Axios from "axios";
import { SmileOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, notification, Divider } from "antd";
import useResponsive from "../../customHooks/responsiveHook";
import styleVariable from "../../styleVariable";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_USER,
  REACT_APP_API_USER_RESET_PASSWORD,
} = process.env;

const ResetPassword = ({ history, userId }) => {
  const { isMobile } = useResponsive();
  const onFinish = async (values) => {
    try {
      const { data } = await Axios.put(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_USER +
          REACT_APP_API_USER_RESET_PASSWORD +
          userId,
        values
      );
      notification.open({
        message: data,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      });
      window.history.back();
    } catch (error) {
      notification.open({
        message: error.response.data,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      <Col
        xxl={6}
        xs={23}
        className="productCard"
        style={{ padding: 40, marginTop: isMobile ? 40 : 40 }}
      >
        <Row justify="center">
          <h3 style={{ textAlign: "center" }}>Modifier mon mot de passe</h3>
        </Row>
        <Form
          style={{ marginTop: 30 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name={"lastPassword"}
            label={"Ancien mot de passe"}
            rules={[
              {
                required: true,
                message: "Merci d'indiquer votre ancien mot de passe",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="inputStyle" />
          </Form.Item>
          <Form.Item
            name={"newPassword"}
            label={"Nouveau mot de passe"}
            rules={[
              {
                required: true,
                message: "Merci d'indiquer un nouveau mot de passe",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("lastPassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Le nouveau mot de passe est identique à l'ancien!"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password className="inputStyle" />
          </Form.Item>
          <Form.Item
            label="Confirmer mon nouveau mot de passe"
            name="repeat_password"
            rules={[
              {
                required: true,
                message: "Merci de confirmer votre nouveau mot de passe!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Les deux mots de passe ne correspondent pas!"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              className="inputStyle"
              bordered={false}
              className="inputStyle"
            />
          </Form.Item>
          <Row justify="center">
            <Button
              style={{
                background: styleVariable.secondaryColor,
                color: "white",
                border: "none",
              }}
              htmlType="submit"
            >
              Valider
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ResetPassword;
