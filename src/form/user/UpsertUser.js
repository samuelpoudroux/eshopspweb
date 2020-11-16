import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Spin,
  notification,
} from "antd";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import Validator from "validator";
import useResponsive from "../../customHooks/responsiveHook";
import { useForm } from "antd/lib/form/Form";
import styleVariable from "../../styleVariable";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { withRouter } from "react-router";

const { REACT_APP_API_DOMAIN, REACT_APP_API_USER } = process.env;

const UpsertUser = ({ history }) => {
  const [dataForm, setDataForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useResponsive();
  const [form] = useForm();
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;

  const handleChange = ({ value, name }) => {
    // copy de laddress car linitial value de form garde le state initial
    if (name === "billsAddress" || name === "dropAddress") {
      setDataForm({ ...dataForm, [`${name}Bis`]: value, [name]: value });
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    values.billsAddress = JSON.stringify(
      dataForm.billsAddressBis || values.billsAddress
    );
    values.dropAddress = JSON.stringify(
      dataForm.dropAddressBis || values.dropAddress
    );

    try {
      await axios.put(
        REACT_APP_API_DOMAIN + REACT_APP_API_USER + user.userData.id,
        values
      );

      notification.open({
        message: "Informations modifiée avec succés",
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      });
    } catch (error) {
      notification.open({
        message: error.message,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
  };

  const getUserData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_USER + user.userData.id
    );

    for (const [key, value] of Object.entries(data)) {
      if (key === "billsAddress" || key === "dropAddress") {
        data[key] = JSON.parse(value);
      } else {
        data[key] = value;
      }
    }
    setDataForm({ ...dataForm, ...data });
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
    return () => {};
  }, []);
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
      <Col
        xxl={6}
        xs={23}
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          background: "#fff",
          padding: "4%",
          paddingTop: "2%",
          marginTop: isMobile ? 40 : 40,
        }}
      >
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <ArrowLeftOutlined onClick={() => window.history.back()} />
          </Col>
          <Col span={22}>
            <h3 style={{ textAlign: "center" }}>Modifier mes informations</h3>
          </Col>
        </Row>
        {isLoading && <Spin />}
        {!isLoading && (
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ ...dataForm }}
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
                defaultValue={
                  dataForm && dataForm.lastName && dataForm.lastName
                }
                bordered={false}
                className="inputStyle"
                name="lastName"
                onChange={(e) => handleChange(e.target)}
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
                defaultValue={dataForm && dataForm.firstName}
                bordered={false}
                className="inputStyle"
                onChange={(e) => handleChange(e.target)}
                name="firstName"
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
                defaultValue={dataForm && dataForm.email}
                bordered={false}
                className="inputStyle"
                onChange={(e) => handleChange(e.target)}
                name="email"
              />
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
                    dataForm && dataForm.billsAddress && dataForm.billsAddress,
                  onChange: (value) =>
                    handleChange({ value, name: "billsAddress" }),
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
                    dataForm && dataForm.dropAddress && dataForm.dropAddress,
                  onChange: (value) =>
                    handleChange({ value, name: "dropAddress" }),
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
                defaultValue={dataForm && dataForm.phoneNumber}
                bordered={false}
                className="inputStyle"
                onChange={(e) => handleChange(e.target)}
                name="phoneNumber"
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
                Valider mes modifications
              </Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default withRouter(UpsertUser);
