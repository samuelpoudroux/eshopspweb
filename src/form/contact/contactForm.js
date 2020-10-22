import React, { useState } from "react";
import Validator from "validator";
import Axios from "axios";
import {
  SmileOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Form, Button, Row, Col, Spin, Input, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import useResponsive from "../../customHooks/responsiveHook";
import {
  setValuesLocalStorage,
  getDefaultValueLocalStorage,
  getInitialValue,
} from "../../repository/localStorage";
import { PHONENUMBER, EMAIL, ADDRESS } from "../../constants/contact";

const ContactForm = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useResponsive();
  const itemKey = "contactForm";
  const user = JSON.parse(localStorage.getItem("users")) || undefined;
  const {
    REACT_APP_API_DOMAIN,
    REACT_APP_API_CONTACT,
    REACT_APP_API_EMAIL,
  } = process.env;
  const onFinish = async (values) => {
    setIsLoading(true);
    const { data } = await Axios.post(
      REACT_APP_API_DOMAIN + REACT_APP_API_CONTACT + REACT_APP_API_EMAIL,
      values
    );
    const { errors, message } = data;
    if (!errors && message) {
      notification.open({
        message: message,
        icon: <SmileOutlined style={{ color: "#89ba17" }} />,
      });
      history.push("/");
    }
    if (errors && !message) {
      notification.open({
        message: errors,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col>
      <Row justify="center">
        <h1 style={{ color: "#686868" }}>Contact</h1>
      </Row>
      <Row justify="space-around" style={{ height: !isMobile && "50vh" }}>
        <Col
          lg={11}
          sm={24}
          xs={24}
          style={{
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            background: "#fff",
            borderRadius: "2px",
            padding: "1%",
            height: "100%",
          }}
        >
          <h2 style={{ color: "#686868" }}>Votre message</h2>
          <Row justify="center" align="middle">
            <Col span={24}>
              <Form
                name="contact"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={getInitialValue(itemKey)}
              >
                <Col span={24}>
                  <Row justify="center" align="middle">
                    <Col lg={20} md={12} sm={20} xs={20}>
                      <Form.Item
                        label="Objet du message"
                        name="subject"
                        rules={[
                          {
                            required: true,
                            message:
                              "Merci d'indiquer l'objet de votre message",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          name="subject"
                          onChange={(e) =>
                            setValuesLocalStorage(e.target, itemKey)
                          }
                          defaultValue={getDefaultValueLocalStorage(
                            "subject",
                            itemKey
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col lg={20} md={12} sm={20} xs={20}>
                      <Form.Item
                        label="Nom"
                        name="senderName"
                        rules={[
                          {
                            required: true,
                            message: "Merci d'indiquer votre nom",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          name="senderName"
                          onChange={(e) =>
                            setValuesLocalStorage(e.target, itemKey)
                          }
                          defaultValue={
                            (user && user.lastName) ||
                            getDefaultValueLocalStorage("senderName", itemKey)
                          }
                        />
                      </Form.Item>{" "}
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col lg={20} md={12} sm={20} xs={20}>
                      <Form.Item
                        label="Email"
                        name="senderEmail"
                        rules={[
                          {
                            required: true,
                            message: "Merci de renseigner un mail valide",
                          },
                          () => ({
                            validator(rule, value) {
                              if (!Validator.isEmail(value)) {
                                return Promise.reject("Email invalide");
                              }

                              return Promise.resolve();
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input
                          name="senderEmail"
                          onChange={(e) =>
                            setValuesLocalStorage(e.target, itemKey)
                          }
                          defaultValue={
                            (user && user.email) ||
                            getDefaultValueLocalStorage("senderEmail", itemKey)
                          }
                        />
                      </Form.Item>{" "}
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col lg={20} md={12} sm={20} xs={20}>
                      <Form.Item
                        label="Tél"
                        name="senderPhone"
                        rules={[
                          {
                            required: true,
                            message:
                              "Merci de renseigner un numéro de téléphone valide pour qu'on puisse vous recontacter",
                            pattern: new RegExp(
                              /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                            ),
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          name="senderPhone"
                          onChange={(e) =>
                            setValuesLocalStorage(e.target, itemKey)
                          }
                          defaultValue={
                            (user && user.phoneNumber) ||
                            getDefaultValueLocalStorage("senderPhone", itemKey)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col lg={20} md={12} sm={20} xs={20}>
                      <Form.Item
                        label="Message"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Merci d'indiquer votre message",
                          },
                        ]}
                        hasFeedback
                      >
                        <TextArea
                          name="email"
                          onChange={(e) =>
                            setValuesLocalStorage(e.target, itemKey)
                          }
                          defaultValue={getDefaultValueLocalStorage(
                            "email",
                            itemKey
                          )}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ background: "#89ba17", border: "none" }}
                          type="primary"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  {isLoading && <Spin />}
                </Col>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col
          lg={11}
          sm={24}
          xs={24}
          style={{
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            background: "#fff",
            borderRadius: "2px",
            position: "relative",
            width: "auto",
            padding: "1%",
            height: "100%",
          }}
        >
          <h2 style={{ color: "#686868" }}>Information</h2>
          <Row style={{ padding: "1%" }}>
            <Col lg={12} md={12} xs={24}>
              <address>
                <Row align="middle" style={{ marginTop: 40 }}>
                  <Col lg={6} xs={4}>
                    <Row>
                      <HomeOutlined
                        style={{ fontSize: "1.3em", color: "#686868" }}
                      />
                    </Row>
                  </Col>
                  <Col lg={18} xs={20}>
                    <Row>
                      <span>{ADDRESS}</span>
                    </Row>
                  </Col>

                  <br />
                </Row>
                <Row align="middle" style={{ marginTop: 40 }}>
                  <Col lg={6} xs={4}>
                    <Row>
                      <MailOutlined
                        style={{ fontSize: "1.3em", color: "#686868" }}
                      />
                    </Row>
                  </Col>
                  <Col lg={18} xs={12}>
                    <Row>
                      <a
                        style={{ color: "#89ba17" }}
                        href="mailto:jim@rock.com"
                      >
                        {EMAIL}
                      </a>
                    </Row>
                  </Col>

                  <br />
                </Row>
                <Row align="middle" style={{ marginTop: 40 }}>
                  <Col lg={6} xs={4}>
                    <Row>
                      <PhoneOutlined
                        style={{ fontSize: "1.3em", color: "#686868" }}
                      />
                    </Row>
                  </Col>
                  <Col lg={18} xs={12}>
                    <Row>
                      <a style={{ color: "#89ba17" }} href="tel:+13115552368">
                        {PHONENUMBER}
                      </a>
                    </Row>
                  </Col>
                </Row>
              </address>
              <Button
                style={{
                  background: "#89ba17",
                  border: "none",
                  marginTop: isMobile ? 15 : 50,
                }}
                type="primary"
                htmlType="submit"
                onClick={(e) => window.history.back()}
              >
                Retour
              </Button>
            </Col>
            <Col lg={12} md={12} xs={24} style={{ marginTop: isMobile && 15 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40675.06261229756!2d2.9232678538274244!3d50.418905218677295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd33143e8095ab%3A0xf539fc766a47c36e!2sH%C3%A9nin-Beaumont!5e0!3m2!1sfr!2sfr!4v1603208803664!5m2!1sfr!2sfr"
                width="100%"
                height="300"
                frameborder="0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ContactForm;
