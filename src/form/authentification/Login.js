import React, { useContext, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Spin,
  notification,
} from "antd";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";
import { PageHeader } from "../../components/PageHeader";
import { useEffect } from "react";

const Login = ({ history, match }) => {
  const { auth } = useContext(AppContext);
  const { login, user, userData } = auth;
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    const data = await login(values, history);
    console.log(data);
    if (!data.error && match.params.commandResume) {
      history.push(`/paiement/`);
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
    <Col style={{ textAlign: "center", padding: 40 }}>
      <PageHeader
        action={() => window.history.back()}
        title={`Se connecter `}
      />
      <Row
        justify="center"
        align="middle"
        style={{ padding: "2%", height: "50vh" }}
      >
        <Row
          justify="center"
          align="middle"
          style={{
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            background: "#fff",
            borderRadius: "2px",
            position: "relative",
            width: "auto",
            padding: "2%",
          }}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Col>
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
                <Input />
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
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    background: styleVariable.secondaryColor,
                    border: "none",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Se connecter
                </Button>
              </Form.Item>
              {isLoading && <Spin />}
              {user && user.error && (
                <p style={{ color: "red" }}>{user.error}</p>
              )}
              <a
                style={{ color: "grey" }}
                href={`${
                  match.params.paiement
                    ? "/register/commandeResume"
                    : "/register"
                }`}
              >
                S'inscrire
              </a>
            </Col>
          </Form>
        </Row>
      </Row>
    </Col>
  );
};

export default Login;
