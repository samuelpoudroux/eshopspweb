import React, { useState, useEffect } from "react";
import ChatFeedComponent from "./ChatFeed";
import ChatHeader from "./ChatHeader";
import { Col, Row, Spin } from "antd";
import useResponsive from "./customHooks/responsiveHook";
import * as io from "socket.io-client";

const Chat = ({ setChatActive, history }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io(process.env.REACT_APP_API_DOMAIN));
  const { isMobile } = useResponsive();
  useEffect(() => {}, []);

  socket.on("newMessage", (messages) => {
    setMessages(messages);
  });

  return (
    <div
      style={{
        width: isMobile ? "100%" : "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 50,
      }}
    >
      <ChatHeader socket={socket} setChatActive={setChatActive} />
      <Row align="middle">
        {messages.length === 0 && (
          <Col span={24}>
            <Row style={{ height: "350px" }} align="middle" justify="center">
              <Spin />
            </Row>
          </Col>
        )}
        <ChatFeedComponent
          messages={messages}
          socket={socket}
          history={history}
        />
      </Row>
    </div>
  );
};

export default Chat;
