import React, { useCallback } from "react";
import { Badge, Popconfirm } from "antd";
import { withRouter } from "react-router";
import { getTotalPrice } from "../../repository/product";
import { CreditCardOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";
const TotalPrice = ({ history, notClickable }) => {
  const basketList = JSON.parse(localStorage.getItem("basket"));
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList ? basketList : []);
  }, [basketList]);
  const totalPrice = totalPrices();
  return (
    <Popconfirm
      disabled={totalPrice === 0}
      style={{ cursor: "pointer" }}
      title="Souhaitez vous finaliser vos achats ？"
      icon={
        <QuestionCircleOutlined
          style={{ color: styleVariable.secondaryColor }}
        />
      }
      onConfirm={() => history.push("/paiement")}
    >
      <Badge
        style={{
          background: notClickable ? styleVariable.secondaryColor : "white",
          color: notClickable ? "white" : styleVariable.secondaryColor,
          minWidth: "50px",
          cursor: "pointer",
        }}
        count={totalPrice > 0 ? `${totalPrice + "€"}` : 0}
        overflowCount={3000}
        showZero={true}
        offset={[23, -5]}
      >
        <CreditCardOutlined
          rotate={20}
          className={totalPrice > 0 && "creditCard"}
          style={{
            fontSize: "20px",
            color:
              totalPrice === 0 || notClickable
                ? styleVariable.mainColor
                : "color_change 1s infinite alternate",
            cursor: "pointer",
          }}
        />
      </Badge>{" "}
    </Popconfirm>
  );
};

export default withRouter(TotalPrice);
