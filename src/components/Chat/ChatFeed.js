import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Col, notification, Row, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import styleVariable from "../../styleVariable";

const ChatFeedComponent = ({
  messages,
  socket,
  history,
  setFavoriteActive,
  setSubBasketVisible,
}) => {
  const secondTest = useRef(null);
  const [messageEnd, setMessageEnd] = useState();
  const basketList = JSON.parse(localStorage.getItem("basket")) || [];
  const jwt = localStorage.getItem("jwtData");

  useEffect(() => {
    if (jwt) {
      socket.emit("alreadyRegistered", {
        id: 1,
      });
    } else {
      socket.emit("notRegistered", {
        id: 1,
      });
    }
  }, []);

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
    if (basketList.length === 0 && page === "/orderResume") {
      notification.open({
        message: "Votre panier est vide",
      });
    } else {
      appRef.scrollIntoView(true);
      history.push(page);
    }
  };

  const redirect = (expr) => {
    switch (expr) {
      case "Nous vous dirigeons vers la page de paiement":
        return goToPage("/orderResume");
        break;
      case "Gérer mon panier":
        return "blue";
        break;
      case "Nous vous dirigeons vers nos produits":
        return goToPage("/orderResume");
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
        return setSubBasketVisible(true);
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

  const renderStyle = (expr) => {
    const style = {
      border: "none",
      cursor: "pointer",
    };
    switch (expr) {
      case "Gérer mes favoris":
        return {
          ...style,
          color: "white",
          background: styleVariable.secondaryColor,
        };
        break;
      case "Gérer mon panier":
        return {
          ...style,
          color: "white",
          background: styleVariable.mainColor,
        };
      case "Nous contacter":
        return {
          ...style,
          color: "white",
          background: styleVariable.thirdColor,
        };
      case "Finaliser ma commande":
        return {
          ...style,
          color: "white",
          background: styleVariable.secondaryColor,
        };
        break;
      case "Modifier mes informations":
        return {
          ...style,
          color: "white",
          background: styleVariable.mainColor,
        };
        break;
      case "oui":
        return {
          ...style,
          color: "white",
          background: styleVariable.secondaryColor,
        };
        break;
      case "non":
        return {
          ...style,
          color: "white",
          background: styleVariable.mainColor,
        };
        break;
      default:
        return style;
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
                  padding: 20,
                  width: "auto",
                  background: id === 0 ? "white" : styleVariable.secondaryColor,
                }}
                className="productCard"
              >
                <Row justify="center">
                  <p
                    style={{
                      color: id === 0 ? styleVariable.mainColor : "white",
                      fontSize: "1em",
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
                        style={renderStyle(value)}
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
