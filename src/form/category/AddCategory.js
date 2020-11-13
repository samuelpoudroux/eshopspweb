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
  message,
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
import styleVariable from "../../styleVariable";
import useResponsive from "../../customHooks/responsiveHook";
import { withRouter } from "react-router";

const { Option } = Select;
const itemKey = "categories";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_CATEGORIES,
  REACT_APP_API_CATEGORY_CREATE,
} = process.env;

const AddNewCategory = ({ setAddCategory, addCategory, history }) => {
  const [file, setFile] = useState(null);

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
        <Col span={12}>Ajouter une categorie</Col>
      </Row>
    );
  };

  const beforeUploadManage = (file) => {
    setFile(file);
    return false;
  };

  const props = {
    beforeUpload: (file) => beforeUploadManage(file),

    onChange(info) {
      setFile(info.file);
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    file && delete file.originFileObj;
    file && delete file.percent;
    file && delete file.uid;
    formData.append("upload", file);
    for (const [key, value] of Object.entries(values)) {
      formData.append(`${key}`, value);
    }
    try {
      const { data } = await Axios.post(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_CATEGORIES +
          REACT_APP_API_CATEGORY_CREATE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtData")}`,
          },
        }
      );

      const { errors, message } = data;
      if (!errors && message) {
        notification.open({
          message: message,
          icon: <SmileOutlined style={{ color: "#89ba17" }} />,
        });
        setAddCategory(false);
      }
      if (errors && !message) {
        notification.open({
          message: errors,
          icon: <SmileOutlined style={{ color: "red" }} />,
        });
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        notification.open({
          message: "Merci de vous reconnecter",
        });
        history.push("/login");
        setAddCategory(false);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      title={drawerHeader()}
      closable={true}
      placement="right"
      width={isMobile ? 310 : 900}
      onClose={() => setAddCategory(false)}
      visible={addCategory}
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
              <CloseCircleOutlined onClick={() => setAddCategory(false)} />
            </Row>
            <Form
              enctype="multipart/form-data"
              style={{ marginTop: "3%", overflowY: "scroll" }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={getInitialValue(itemKey)}
            >
              <Col>
                <Form.Item
                  label="Nom de la catégorie"
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
                    defaultValue={getDefaultValueLocalStorage("name", itemKey)}
                  />
                </Form.Item>

                <Form.Item label="Images produits">
                  <Form.Item>
                    <Upload {...props}>
                      <Button disabled={file} icon={<UploadOutlined />}>
                        Insérer une image
                      </Button>
                    </Upload>
                    ,
                  </Form.Item>
                </Form.Item>

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
                    Créer la catégorie
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

AddNewCategory.propTypes = {};

export default withRouter(AddNewCategory);
