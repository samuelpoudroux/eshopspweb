import React from "react";
import { Badge, Col, Row } from "antd";
import styleVariable from "../../styleVariable";
import { ShoppingCartOutlined } from "@ant-design/icons";

const BasketNotification = ({ renderNotification, notification, product }) => {
  return (
    <Col lg={1} md={8} sm={6} xs={6}>
      <Row justify="end" align="middle">
        <Badge
          style={{
            background: notification.add ? styleVariable.secondaryColor : "red",
          }}
          count={renderNotification(product)}
          overflowCount={250}
        >
          {notification && (
            <ShoppingCartOutlined
              style={{
                fontSize: "20px",
                color: styleVariable.secondaryColor,
                marginRight: "16px",
              }}
            />
          )}
        </Badge>
      </Row>
    </Col>
  );
};

export default BasketNotification;
