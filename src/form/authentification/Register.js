import React from "react";

import Validator from "validator";
import Axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  notification,
  Descriptions,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
  setValuesLocalStorage,
  getDefaultValueLocalStorage,
  getInitialValue,
} from "../../repository/localStorage";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import styleVariable from "../../styleVariable";
import { PageHeader } from "../../components/PageHeader";
import { useState } from "react";
import { set } from "lodash";
import { useForm } from "antd/lib/form/Form";
const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_AUTH,
  REACT_APP_API_AUTH_REGISTER,
} = process.env;

const Register = ({ history, match }) => {
  const [billsAddress, setBillsAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [form] = useForm();

  const onFinish = async (values) => {
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

  const setAdresse = (e, type) => {
    if (type === "billsAddress") {
      form.setFieldsValue({ billsAddress: e.label });
      localStorage.setItem("billsAddress", JSON.stringify(e));
      setBillsAddress(e);
      setValuesLocalStorage(
        { value: e, name: "billsAddress" },
        itemKey,
        "billsAddress"
      );
    } else {
      form.setFieldsValue({ dropAddress: e.label });
      localStorage.setItem("dropAddress", JSON.stringify(e));
      setDropAddress(e);
      setValuesLocalStorage(
        { value: e, name: "dropAddress" },
        itemKey,
        "dropAddress"
      );
    }
  };

  return (
    <Col style={{ padding: "5px", textAlign: "center" }}>
      <PageHeader action={() => window.history.back()} title={`S'inscrire `} />
      <Row justify="center" align="middle" style={{ padding: "2%" }}>
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
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={getInitialValue(itemKey)}
          >
            <Col>
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
                  onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                  name="lastName"
                  defaultValue={getDefaultValueLocalStorage(
                    "lastName",
                    itemKey
                  )}
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
                  onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                  name="firstName"
                  defaultValue={getDefaultValueLocalStorage(
                    "firstName",
                    itemKey
                  )}
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
                  onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                  name="email"
                  defaultValue={getDefaultValueLocalStorage("email", itemKey)}
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
                <Input.Password />
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
                <Input.Password />
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
                      (localStorage.getItem("billsAddress") &&
                        JSON.parse(localStorage.getItem("billsAddress"))),
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
                  selectProps={{
                    value:
                      dropAddress ||
                      (localStorage.getItem("dropAddress") &&
                        JSON.parse(localStorage.getItem("dropAddress"))),
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
                    message:
                      "Merci de renseigner un numéro de téléphone valide",
                    pattern: new RegExp(
                      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                    ),
                  },
                ]}
                hasFeedback
              >
                <Input
                  onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                  name="phoneNumber"
                  defaultValue={getDefaultValueLocalStorage("phoneNumber", {
                    itemKey,
                  })}
                />
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
                  S'enregistrer
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Row>
    </Col>
  );
};

export default Register;
