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
  Spin,
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classic from "@ckeditor/ckeditor5-build-classic";

const { Option } = Select;
const itemKey = "product";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_PRODUCT_ADD,
  REACT_APP_API_CATEGORIES,
} = process.env;
const config = {
  toolbar: [
    "heading",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
  ],
};

const Loadnewproduct = ({ setAddProduct, addProduct, history }) => {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  console.log("categories", categories);
  useEffect(() => {
    setInitialValues(getInitialValue(itemKey));
    Axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_CATEGORIES
    ).then(({ data }) => setCategories(data));
    return () => {};
  }, []);

  const props = {
    beforeUpload: (file) => false,

    onChange(info) {
      setFiles([...files, ...info.fileList.map((file) => file.originFileObj)]);
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
    files.forEach((file) => {
      delete file.originFileObj;
      delete file.percent;
      delete file.uid;
      formData.append("upload", file);
    });
    for (const [key, value] of Object.entries(values)) {
      formData.append(`${key}`, value);
    }
    try {
      setIsLoading(true);
      const { data } = await Axios.post(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_PRODUCT +
          REACT_APP_API_PRODUCT_ADD,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtData")}`,
          },
        }
      );

      notification.open({
        message: data,
        icon: <SmileOutlined style={{ color: "#89ba17" }} />,
      });
      setAddProduct(false);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        notification.open({
          message: "Merci de vous reconnecter",
        });
        history.push("/login");
        setAddProduct(false);
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
              enctype="multipart/form-data"
              style={{ marginTop: "3%", overflowY: "scroll" }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={initialValues}
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
                    initialValue={getDefaultValueLocalStorage("name", itemKey)}
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
                    initialValue={getDefaultValueLocalStorage(
                      "productPrice",
                      itemKey
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Nombre en stock"
                  name="stockNumber"
                  rules={[
                    {
                      required: true,
                      message: "Merci d'indiquer le nombre de produit en stock",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="inputStyle"
                    type="number"
                    min={0}
                    onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
                    name="stockNumber"
                    initialValue={getDefaultValueLocalStorage(
                      "stockNumber",
                      itemKey
                    )}
                  />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <CKEditor
                    editor={classic}
                    config={config}
                    data={
                      getDefaultValueLocalStorage("description", itemKey) ||
                      null
                    }
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setValuesLocalStorage(
                        { value: data, name: "description" },
                        itemKey
                      );
                    }}
                  />
                </Form.Item>

                <Form.Item label="Composition" name="formule">
                  <CKEditor
                    editor={classic}
                    config={config}
                    data={
                      getDefaultValueLocalStorage("formule", itemKey) || null
                    }
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setValuesLocalStorage(
                        { value: data, name: "formule" },
                        itemKey
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item label="Conseils" name="advice">
                  <CKEditor
                    editor={classic}
                    config={config}
                    data={
                      getDefaultValueLocalStorage("advice", itemKey) || null
                    }
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setValuesLocalStorage(
                        { value: data, name: "advice" },
                        itemKey
                      );
                    }}
                  />
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

                <Form.Item label="Images produits">
                  <Form.Item>
                    <Upload {...props} multiple={true}>
                      <Button icon={<UploadOutlined />}>
                        Insérer des images
                      </Button>
                    </Upload>
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
                    Créer le produit
                  </Button>
                </Form.Item>
                <Row justify="center">{isLoading && <Spin />}</Row>
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
