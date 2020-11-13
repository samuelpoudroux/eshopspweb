import React, { useContext, useState } from "react";
import { SmileOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Spin,
  notification,
  Divider,
} from "antd";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";
import StickyBar from "../../components/product/StickyBar";
import scrollTop from "../../repository/scrollTop";
import PageHeader from "../../components/PageHeader";
import useResponsive from "../../customHooks/responsiveHook";
import {
  getDefaultValueLocalStorage,
  setValuesLocalStorage,
} from "../../repository/localStorage";

const Login = ({ history, match }) => {
  const { auth } = useContext(AppContext);
  const { login, user, userData } = auth;
  const [isLoading, setIsLoading] = useState(false);
  const { appRef } = useContext(AppContext);
  const { isMobile } = useResponsive();

  const goRegister = () => {
    scrollTop(appRef);

    history.push(
      `${match.params.paiement ? "/register/orderResume" : "/register"}`
    );
  };

  const itemKey = "login";

  const onFinish = async (values) => {
    setIsLoading(true);
    const data = await login(values, history);
    if (!data.error && match.params.commandResume) {
      history.push(`/orderResume/${data.userData.id}`);
      notification.open({
        message: "Vous êtes connecté",
        icon: <SmileOutlined style={{ color: "#89ba17" }} />,
      });
    } else if (data.error) {
      notification.open({
        message: data.error,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    } else if (!data.error) {
      history.push(`/`);
      notification.open({
        message: "Vous êtes connecté",
        icon: <SmileOutlined style={{ color: "#89ba17" }} />,
      });
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        borderRadius: "2px",
        position: "relative",
        width: "auto",
        textAlign: "center",
      }}
    >
      <StickyBar title={`SE CONNECTER`} />

      <Col
        xxl={6}
        xs={23}
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          background: "#fff",
          padding: "4%",
          marginTop: isMobile ? 40 : 120,
        }}
      >
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <ArrowLeftOutlined onClick={() => window.history.back()} />
          </Col>
          <Col span={22}>
            <h3 style={{ textAlign: "center" }}>Se connecter</h3>
          </Col>
        </Row>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Col>
            <Divider className="dividerAuth" />
          </Col>
          <Form.Item
            label="Mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
              defaultValue={getDefaultValueLocalStorage("email", itemKey)}
              name="email"
              className="inputStyle"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="inputStyle" bordered={false} />
          </Form.Item>
          <a style={{ color: styleVariable.secondaryColor }}>
            Mot de passe oublié
          </a>
          <Form.Item>
            <Button
              style={{
                background: styleVariable.secondaryColor,
                border: "none",
                marginTop: 20,
              }}
              type="primary"
              htmlType="submit"
            >
              SE CONNECTER
            </Button>
          </Form.Item>

          <Col span={24}>
            <h3 style={{ color: styleVariable.mainColor }}>
              Vous n'êtes pas encore membre ?
            </h3>
            <Divider className="dividerAuth" />
          </Col>

          {isLoading && <Spin />}
          {user && user.error && <p style={{ color: "red" }}>{user.error}</p>}
          <Button
            style={{
              color: "grey",
              border: `1px solid ${styleVariable.secondaryColor}`,
            }}
            onClick={() => goRegister()}
          >
            CRÉEZ MON COMPTE
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
