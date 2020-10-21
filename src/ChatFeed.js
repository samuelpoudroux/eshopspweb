import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

const ChatFeedComponent = ({ messages, socket, history }) => {
  const [messageEnd, setMessageEnd] = useState();

  useEffect(() => {
    if (messageEnd !== undefined) {
      messageEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendResponseToBot = (value, previousMessage) => {
    socket.emit("newMessage", {
      id: 1,
      message: value,
      questionOrigin: previousMessage,
    });
  };

  const goToPage = (redirect) => {
    if (redirect !== "products") {
      var elmnt = document.getElementById("root");
      elmnt.scrollIntoView();
      history.push(`/${redirect}`);
    } else {
      var elmnt = document.getElementById("root");
      history.push(`/`);
    }
  };

  return (
    <Col
      lg={24}
      style={{
        position: "relative",
        overflow: "scroll",
        maxHeight: "350px",
        WebkitOverflowScroll: "touch",
      }}
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
                        key={value}
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
