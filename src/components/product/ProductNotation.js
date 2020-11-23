import React, { useState } from "react";
import Axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  Divider,
  notification,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
  getDefaultValueLocalStorage,
  getInitialValue,
  setValuesLocalStorage,
} from "../../repository/localStorage";
import TextArea from "antd/lib/input/TextArea";
import ReactStars from "react-stars";
import styleVariable from "../../styleVariable";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_PRODUCT_NOTATION,
} = process.env;
export const ProductNotation = ({ productId, userId, setReload, reload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [form] = useForm();

  const itemKey = "notation";
  const ratingChanged = (newRating) => {
    setValuesLocalStorage({ name: "note", value: newRating }, itemKey);
    setNote(newRating);
  };

  const onFinish = async (values) => {
    let notationDate;
    notationDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    setIsLoading(true);
    values.notationDate = notationDate;
    try {
      const { data } = await Axios.post(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_PRODUCT +
          REACT_APP_API_PRODUCT_NOTATION +
          userId +
          "/" +
          productId,
        values
      );

      const { errors, message } = data;
      if (!errors && message) {
        notification.open({
          message: message,
          icon: (
            <SmileOutlined style={{ color: styleVariable.secondaryColor }} />
          ),
        });
        setReload(!reload);
      }
      if (errors && !message) {
        notification.open({
          message: errors,
          icon: <SmileOutlined style={{ color: "red" }} />,
        });
      }
      setIsLoading(false);
    } catch (error) {
      notification.open({
        message: error,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col span={12}>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={getInitialValue(itemKey)}
      >
        {isLoading && <Spin />}
        <Col>
          <Divider className="dividerAuth" />
        </Col>
        <Form.Item
          label="Commentaire"
          name="comment"
          rules={[
            {
              required: true,
              message: "Merci de mettre un commentaire",
            },
          ]}
        >
          <TextArea
            onChange={(e) => setValuesLocalStorage(e.target, itemKey)}
            name="comment"
            value={note}
            className="inputStyle"
            bordered={false}
          />
        </Form.Item>
        <Form.Item
          label="Note"
          name="note"
          rules={[
            {
              required: true,
              message: "Merci de mettre une note",
            },
          ]}
        >
          <ReactStars
            count={5}
            value={note}
            onChange={ratingChanged}
            size={24}
            color2={styleVariable.thirdColor}
          />
        </Form.Item>
        <Row justify="center">
          <Button
            style={{
              background: styleVariable.secondaryColor,
              border: "none",
              marginTop: 20,
            }}
            type="primary"
            htmlType="submit"
          >
            Envoyer
          </Button>
        </Row>
      </Form>
    </Col>
  );
};
