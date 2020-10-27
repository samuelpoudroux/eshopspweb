import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Col, Row, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import styleVariable from "./styleVariable";

const ChatFeedComponent = ({
  messages,
  socket,
  history,
  setChatActive,
  setFavoriteActive,
  setBasketActive,
}) => {
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

    if (messages && messages.length > 0) {
      const copy = messages;
      redirect(messages.pop().message);
    }
  }, [messages]);

  const goToPage = (page) => {
    appRef.scrollIntoView(true);
    history.push(page);
  };

  const redirect = (expr) => {
    switch (expr) {
      case "Nous vous dirigeons vers la page de paiement":
        return goToPage("/paiement");
        break;
      case "Gérer mon panier":
        return "blue";
        break;
      case "Nous vous dirigeons vers nos produits":
        return goToPage("/paiement");
        break;
      case "Nous vous dirigons vers la page de création":
        return goToPage("/register");
        break;
      case "Nous vous redirigeons vers notre page contact":
        return goToPage("/contact");
        break;
      case "Voici vos favoris":
        return setFavoriteActive(true);
        break;
      case "Voici votre panier":
        return setBasketActive(true);
      case "Nous vous dirigeons vers la page de gestion du compte":
        return goToPage("/informations");
        break;
      default:
        return "grey";
    }
  };

  const appRef = document.getElementById("root");
  const sendResponseToBot = (value, previousMessage) => {
    socket.emit("newMessage", {
      id: 1,
      message: value,
      questionOrigin: previousMessage,
    });
  };

  const renderBackgroundInput = (expr) => {
    switch (expr) {
      case "Gérer mes favoris":
        return "#be924a";
        break;
      case "Gérer mon panier":
        return "grey";
      case "Finaliser ma commande":
        return "grey"; // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "Modifier mes informations":
        return "#be924a"; // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "oui":
        return "white"; // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "non":
        return "grey"; // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        return "grey";
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
                  background:
                    id === 0
                      ? styleVariable.mainColor
                      : styleVariable.secondaryColor,
                  padding: 20,
                  borderRadius: 50,
                  width: "60%",
                }}
              >
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
                          background: renderBackgroundInput(value),
                          border: "none",
                          color:
                            value === "oui" ? styleVariable.mainColor : "white",
                          cursor: "pointer",
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
