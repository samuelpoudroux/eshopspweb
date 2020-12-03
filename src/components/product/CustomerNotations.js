import React, { useState } from "react";
import Axios from "axios";
import { Row, Col, Spin, Divider, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import ReactStars from "react-stars";
import styleVariable from "../../styleVariable";
import { useEffect } from "react";
import { getDateWithHours } from "../../helpers/Date";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_PRODUCT_NOTATION,
} = process.env;

export const CustomerNotations = ({ productId, userId, reload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notations, setNotations] = useState([]);

  const getNotations = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(
        REACT_APP_API_DOMAIN +
          REACT_APP_API_PRODUCT +
          REACT_APP_API_PRODUCT_NOTATION +
          productId
      );
      setNotations(data);
      setIsLoading(false);
    } catch (error) {
      notification.open({
        message: error.message,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotations();
  }, [productId, reload]);

  return (
    <Col
      span={24}
      style={{
        overflowY: "scroll",
        overflow: "auto",
        maxHeight: "40vh",
      }}
    >
      {isLoading && <Spin />}
      {notations.length === 0 && (
        <Row justify="center">
          <p>Pas d'avis déposé pour ce produit</p>
        </Row>
      )}
      {notations.map((notation) => {
        return (
          <Col className="productCard" style={{ padding: 20, marginTop: 5 }}>
            <Row align="middle" justify="space-between">
              <p>
                Avis de {notation.firstName} {notation.lastName}
              </p>
              <ReactStars
                count={5}
                value={notation.note}
                edit={false}
                size={24}
                color2={styleVariable.secondaryColor}
              />
            </Row>
            <Row align="middle" justify="space-between">
              <p>{notation.comment}</p>
            </Row>
            <Row>
              <i style={{ color: styleVariable.thirdColor }}>
                Posté le <span>{getDateWithHours(notation.notationDate)}</span>
              </i>
            </Row>
          </Col>
        );
      })}
    </Col>
  );
};
