import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";

const ChatFeedComponent = ({ messages, socket, history, setChatActive }) => {
  const secondTest = useRef(null);
  const [messageEnd, setMessageEnd] = useState();
  useEffect(() => {
    if (messageEnd !== undefined) {
      messageEnd.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  const appRef = document.getElementById("root");
  const sendResponseToBot = (value, previousMessage) => {
    socket.emit("newMessage", {
      id: 1,
      message: value,
      questionOrigin: previousMessage,
    });
  };

  const goToPage = (redirect) => {
    if (redirect !== "products") {
      appRef.scrollIntoView(true);
      setChatActive(false);
      history.push(`/${redirect}`);
    } else {
      appRef.scrollIntoView(true);
      setChatActive(false);
      history.push(`/`);
    }
  };

  return (
    <Col
      lg={24}
      style={{
        position: "relative",
        overflow: "auto",
        maxHeight: "350px",
        WebkitOverflowScroll: "touch",
        padding: "2%",
      }}
      ref={secondTest}
    >
      {messages.length > 0 &&
        messages.map((value) => {
          const { id, message, type, choice, redirect } = value;
          return (
            <Row
              key={message}
              style={{ marginTop: 25 }}
              justify={id === 0 ? "start" : "end"}
            >
              <Col
                lg={18}
                sm={24}
                style={{
                  background: id === 0 ? "#89ba17" : "grey",
                  padding: 20,
                  borderRadius: 50,
                  width: "60%",
                }}
              >
                {redirect && goToPage(redirect)}
                <Row justify="center">
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.2em",
                      textAlign: "center",
                    }}
                  >
                    {message}
                  </p>
                </Row>
                <Row justify="center">
                  {type &&
                    type === "choice" &&
                    choice &&
                    choice.map((value) => (
                      <input
                        key={uuidv4()}
                        type="button"
                        style={{
                          background: value === "oui" ? "white" : "grey",
                          border: "none",
                        }}
                        value={value}
                        onClick={(e) =>
                          sendResponseToBot(e.target.value, message)
                        }
                      />
                    ))}
                </Row>
              </Col>
            </Row>
          );
        })}
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          setMessageEnd(el);
        }}
      ></div>
    </Col>
  );
};
export default ChatFeedComponent;
