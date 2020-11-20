import React, { useCallback, useContext, useEffect, useState } from "react";
import { Badge, Popconfirm } from "antd";
import { withRouter } from "react-router";
import { getTotalPrice } from "../../repository/product";
import { CreditCardOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";
import { AppContext } from "../../context/context";
const TotalPrice = ({ history, setSubBasketVisible, notClickable }) => {
  const { basket } = useContext(AppContext);
  const { basketList } = basket;
  const [totalPrice, setTotalPrice] = useState(0);

  const totalPrices = useCallback(async () => {
    setTotalPrice(await getTotalPrice(basketList ? basketList : []));
  }, [basketList]);

  const goOrderResume = () => {
    history.push("/orderResume");
    setSubBasketVisible(false);
  };

  useEffect(() => {
    totalPrices();
  }, [basketList]);
  return (
    <Popconfirm
      placement={"bottom"}
      disabled={totalPrice === 0}
      style={{ cursor: "pointer" }}
      title="Souhaitez vous finaliser vos achats ？"
      icon={
        <QuestionCircleOutlined
          style={{ color: styleVariable.secondaryColor }}
        />
      }
      onConfirm={() => goOrderResume()}
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
        showZero={false}
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
