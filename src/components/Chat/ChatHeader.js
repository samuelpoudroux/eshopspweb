import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";
import { Col, Row } from "antd";

const ChatHeader = ({ setChatActive, socket }) => {
  const closeTag = () => {
    // socket.emit('disconnect')
    setChatActive(false);
  };
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        background: styleVariable.secondaryColor,
        borderRadius: "4px 4px 0 0",
        height: "60px",
        width: "100%",
        padding: 15,
      }}
    >
      <Col span={20}>
        <h4 style={{ color: "white", textAlign: "start" }}>
          En quoi puis je vous aider ?
        </h4>
      </Col>
      <CloseCircleOutlined
        onClick={() => closeTag()}
        style={{ color: "white" }}
      />
    </Row>
  );
};
export default ChatHeader;
