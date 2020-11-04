import React, { useState, useEffect } from "react";
import logo from "../../assets/iconGrey.svg";

import Axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  notification,
  Select,
  Upload,
  Drawer,
} from "antd";
import {
  setValuesLocalStorage,
  getDefaultValueLocalStorage,
  getInitialValue,
} from "../../repository/localStorage";
import {
  SmileOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import styleVariable from "../../styleVariable";
import useResponsive from "../../customHooks/responsiveHook";
import { withRouter } from "react-router";

const { Option } = Select;
const itemKey = "product";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_PRODUCT_ADD,
  REACT_APP_API_CATEGORIES,
} = process.env;

const Loadnewproduct = ({
  setAddProduct,
  forceUpdate,
  addProduct,
  history,
}) => {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState();
  const { isMobile } = useResponsive();

  const drawerHeader = () => {
    return (
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <img
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobile ? "110%" : "40%",
              maxHeight: isMobile ? "120%" : "40%",
              cursor: "pointer",
            }}
          />
        </Col>
        <Col span={12}>Ajouter un produit</Col>
      </Row>
    );
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("upload", files);

    for (const [key, value] of Object.entries(values)) {
      formData.append(`${key}`, value);
    }

    try {
      const { data } = await Axios.post(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_PRODUCT +
          REACT_APP_API_PRODUCT_ADD,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtData")}`,
          },
        }
      );
      const { error, message } = data;
      if (!error && message) {
        notification.open({
          message: message,
          icon: <SmileOutlined style={{ color: "#89ba17" }} />,
        });
        setAddProduct(false);
        forceUpdate({});
      }
      if (error && !message) {
        notification.open({
          message: error,
          icon: <SmileOutlined style={{ color: "red" }} />,
        });
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 401") {
        notification.open({
          message: "Merci de vous reconnecter",
        });
        history.push("/login");
      }
    }
  };

  useEffect(() => {
    Axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_CATEGORIES
    ).then(({ data }) => setCategories(data));
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      title={drawerHeader()}
      closable={true}
      placement="right"
      width={isMobile ? 310 : 900}
      onClose={() => setAddProduct(false)}
      visible={addProduct}
      key={"top"}
      closable={false}
      bodyStyle={{
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      style={{ zIndex: 26, overflowY: "scroll" }}
      footerStyle={{ padding: "0px" }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "2%",
        }}
        onClick={(e) => e.stopPropagation()}
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
            padding: "1%",
          }}
        >
          <Col>
            <Row justify="end">
              <CloseCircleOutlined onClick={() => setAddProduct(false)} />
            </Row>
            <Form
              style={{ marginTop: "3%", overflowY: "scroll" }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={getInitialValue(itemKey)}
            >
              <Col>
                <Form.Item
                  label="Nom du produit"
                  name="name"
                  rules={[
                    {
                      required: true,
                      min: 4,
                      message: "Nom oligatoire avec minimum 3 caractéres",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="inputStyle"
                    onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                    name="name"
                    defaultValue={getDefaultValueLocalStorage("name", {
                      itemKey,
                    })}
                  />
                </Form.Item>
                <Form.Item
                  label=" Prix du produit"
                  name="productPrice"
                  rules={[
                    {
                      required: true,
                      message: "Merci d'indiquer le prix du produit",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="inputStyle"
                    type="number"
                    min={0}
                    onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                    name="productPrice"
                    defaultValue={getDefaultValueLocalStorage(
                      "productPrice",
                      itemKey
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Longue description"
                  name="longDescription"
                  rules={[
                    {
                      min: 10,
                      message: "Nom avec minimum 10 caractéres",
                    },
                  ]}
                  hasFeedback
                >
                  <TextArea
                    onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                    name="longDescription"
                    defaultValue={getDefaultValueLocalStorage(
                      "longDescription",
                      itemKey
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="courte description"
                  name="shortDescription"
                  rules={[
                    {
                      min: 10,
                      message: "Nom oligatoire avec minimum 10 caractéres",
                    },
                  ]}
                  hasFeedback
                >
                  <TextArea
                    onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                    name="shortDescription"
                    defaultValue={getDefaultValueLocalStorage(
                      "shortDescription",
                      itemKey
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="En stock"
                  name="inStock"
                  rules={[
                    {
                      required: true,
                      message: "Merci de renseigner si en stock ou non",
                    },
                  ]}
                  hasFeedback
                >
                  <Select>
                    <Option value="true">oui</Option>
                    <Option value="false">non</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Catégorie"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Merci de renseigner la catégorie du produit",
                    },
                  ]}
                  hasFeedback
                >
                  <Select>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category) => (
                        <Option key={category.id} value={category.name}>
                          {category.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Nouveauté"
                  name="newNess"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  hasFeedback
                >
                  <Select>
                    <Option value="true">oui</Option>
                    <Option value="false">non</Option>
                  </Select>
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                  <Upload
                    beforeUpload={(file) => {
                      setFiles(file);
                      return false;
                    }}
                    onRemove={(file) => setFiles(null)}
                  >
                    <Button
                      disabled={files ? true : false}
                      icon={<UploadOutlined />}
                    >
                      Charger l'image du produit
                    </Button>
                  </Upload>
                </div>

                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    style={{
                      background: styleVariable.secondaryColor,
                      border: "none",
                      marginTop: "1rem",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    S'enregistrer
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Col>
        </Row>
      </Row>
    </Drawer>
  );
};

Loadnewproduct.propTypes = {};

export default withRouter(Loadnewproduct);
