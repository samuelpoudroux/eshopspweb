import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  notification,
  Select,
  Upload,
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

const { Option } = Select;
const itemKey = "product";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_PRODUCT_ADD,
  REACT_APP_API_CATEGORIES,
} = process.env;

const Loadnewproduct = ({ setAddProduct, forceUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("upload", files);
    for (const [key, value] of Object.entries(values)) {
      formData.append(`${key}`, value);
    }

    const { data } = await Axios.post(
      REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT + REACT_APP_API_PRODUCT_ADD,
      formData
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
    <div className="popup">
      <div className="popup_inner">
        <Row
          justify="center"
          align="middle"
          style={{
            padding: "2%",
            background: "rgba(0, 0, 0, 0.7)",
          }}
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
                      onChange={(e) =>
                        setValuesLocalStorage(e.target, { itemKey })
                      }
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
                      type="number"
                      min={0}
                      onChange={(e) =>
                        setValuesLocalStorage(e.target, { itemKey })
                      }
                      name="productPrice"
                      defaultValue={getDefaultValueLocalStorage(
                        "productPrice",
                        { itemKey }
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
                      onChange={(e) =>
                        setValuesLocalStorage(e.target, { itemKey })
                      }
                      name="longDescription"
                      defaultValue={getDefaultValueLocalStorage(
                        "longDescription",
                        { itemKey }
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
                      onChange={(e) =>
                        setValuesLocalStorage(e.target, { itemKey })
                      }
                      name="shortDescription"
                      defaultValue={getDefaultValueLocalStorage(
                        "shortDescription",
                        { itemKey }
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
                  <Form.Item>
                    <Button
                      style={{
                        background: "#89ba17",
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
      </div>
    </div>
  );
};

Loadnewproduct.propTypes = {};

export default Loadnewproduct;
