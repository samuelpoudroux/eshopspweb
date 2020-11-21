import React from "react";

import Validator from "validator";
import Axios from "axios";
import { Form, Input, Button, Row, Col, notification, Divider } from "antd";
import { SmileOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {
  setValuesLocalStorage,
  getDefaultValueLocalStorage,
  getInitialValue,
} from "../../repository/localStorage";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import styleVariable from "../../styleVariable";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import StickyBar from "../../components/product/StickyBar";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import scrollTop from "../../repository/scrollTop";
import useResponsive from "../../customHooks/responsiveHook";
const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_AUTH,
  REACT_APP_API_AUTH_REGISTER,
} = process.env;

const Register = ({ history, match }) => {
  const [billsAddress, setBillsAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const { appRef } = useContext(AppContext);
  const { isMobile } = useResponsive();
  const [form] = useForm();

  const onFinish = async (values) => {
    values.billsAddress = JSON.stringify(values.billsAddress);
    values.dropAddress = JSON.stringify(values.dropAddress);
    const { data } = await Axios.post(
      REACT_APP_API_DOMAIN + REACT_APP_API_AUTH + REACT_APP_API_AUTH_REGISTER,
      values
    );
    const { errors, message } = data;
    if (!errors && message) {
      notification.open({
        message: message,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      });
      if (match.params.commandResume) {
        history.push("/login/paiement");
      } else {
        history.push("/login");
      }
    }
    if (errors && !message) {
      notification.open({
        message: errors,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const itemKey = "userData";

  const goLogin = () => {
    scrollTop(appRef);
    history.push("/login");
  };

  const setAdresse = (value, type) => {
    if (type === "billsAddress") {
      form.setFieldsValue({ billsAddress: value });
      setBillsAddress(value);
      setValuesLocalStorage(
        { value: value, name: "billsAddress" },
        itemKey,
        "billsAddress"
      );
    } else {
      form.setFieldsValue({ dropAddress: value });
      setDropAddress(value);
      setValuesLocalStorage(
        { value: value, name: "dropAddress" },
        itemKey,
        "dropAddress"
      );
    }
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
      <StickyBar title={`CRÉER UN COMPTE`} />
      <Col
        xxl={6}
        xs={23}
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          background: "#fff",
          padding: "4%",
          paddingTop: "2%",
          marginTop: isMobile ? 40 : 120,
        }}
      >
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <ArrowLeftOutlined onClick={() => window.history.back()} />
          </Col>
          <Col span={22}>
            <h3 style={{ textAlign: "center" }}>S'inscrire</h3>
          </Col>
        </Row>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={getInitialValue(itemKey)}
        >
          <Col span={24}>
            <Divider className="dividerAuth" />
          </Col>
          <Form.Item
            label="Nom"
            name="lastName"
            rules={[
              {
                required: true,
                min: 4,
                message: "Nom oligatoire avec minimum 4 caractéres",
              },
            ]}
            hasFeedback
          >
            <Input
              bordered={false}
              className="inputStyle"
              name="lastName"
              onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
              initialValue={getDefaultValueLocalStorage("lastName", itemKey)}
            />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="firstName"
            rules={[
              {
                required: true,
                min: 4,
                message: "Prénom oligatoire avec minimum 4 caractéres",
              },
            ]}
            hasFeedback
          >
            <Input
              bordered={false}
              className="inputStyle"
              onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
              name="firstName"
              initialValue={getDefaultValueLocalStorage("firstName", itemKey)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Merci d'indiquer votre email!",
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
          >
            <Input
              bordered={false}
              className="inputStyle"
              onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
              name="email"
              initialValue={getDefaultValueLocalStorage("email", itemKey)}
            />
          </Form.Item>
          <Form.Item
            label="mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Merci d'indiquer un mot de passe",
              },
            ]}
            hasFeedback
          >
            <Input.Password bordered={false} className="inputStyle" />
          </Form.Item>
          <Form.Item
            label="Confirmer mot de passe"
            name="repeat_password"
            rules={[
              {
                required: true,
                message: "Merci de confirmer votre mot de passe!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
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
            <Input.Password bordered={false} className="inputStyle" />
          </Form.Item>
          <Form.Item
            label="Adresse de facturation"
            name="billsAddress"
            rules={[
              {
                required: true,
                message: "L'adresse de facturation est requise",
              },
            ]}
            hasFeedback
          >
            <GooglePlacesAutocomplete
              selectProps={{
                value:
                  billsAddress ||
                  getDefaultValueLocalStorage("billsAddress", itemKey),
                onChange: (value) => setAdresse(value, "billsAddress"),
              }}
              apiKey={process.env.REACT_APP_API_GOOGLE_MAP}
              autocompletionRequest={{
                bounds: [
                  { lat: 50, lng: 50 },
                  { lat: 100, lng: 100 },
                ],
                componentRestrictions: {
                  country: ["fr"],
                },
              }}
            />
          </Form.Item>
          <Form.Item
            label="Adresse de livraison"
            name="dropAddress"
            rules={[
              {
                required: true,
                message: "L'adresse de livraison est requise",
              },
            ]}
            hasFeedback
          >
            <GooglePlacesAutocomplete
              bordered={false}
              className="inputStyle"
              selectProps={{
                value:
                  dropAddress ||
                  getDefaultValueLocalStorage("dropAddress", itemKey),
                onChange: (value) => setAdresse(value, "dropAddress"),
              }}
              apiKey={process.env.REACT_APP_API_GOOGLE_MAP}
              autocompletionRequest={{
                bounds: [
                  { lat: 50, lng: 50 },
                  { lat: 100, lng: 100 },
                ],
                componentRestrictions: {
                  country: ["fr"],
                },
              }}
            />
          </Form.Item>

          <Form.Item
            label="Numéro de téléphone"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Merci de renseigner un numéro de téléphone valide",
                pattern: new RegExp(
                  /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                ),
              },
            ]}
            hasFeedback
          >
            <Input
              bordered={false}
              className="inputStyle"
              onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
              name="phoneNumber"
              initialValue={getDefaultValueLocalStorage("phoneNumber", {
                itemKey,
              })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                background: styleVariable.secondaryColor,
                border: "none",
                color: "white",
              }}
              htmlType="submit"
            >
              CRÉEZ MON COMPTE
            </Button>
          </Form.Item>

          <Col span={24}>
            <h3 style={{ color: styleVariable.mainColor }}>
              Vous êtes déjà membre ?
            </h3>
            <Divider className="dividerAuth" />
          </Col>
          <Button
            style={{
              color: "grey",
              border: `1px solid ${styleVariable.secondaryColor}`,
            }}
            onClick={() => goLogin()}
          >
            IDENTIFIEZ-VOUS
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
