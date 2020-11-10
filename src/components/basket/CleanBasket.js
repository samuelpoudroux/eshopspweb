import React, { useContext } from "react";
import { Popconfirm, notification } from "antd";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";

const CleanBasket = ({ color = "white", fontSize = "20px", placement }) => {
  const { basket } = useContext(AppContext);
  const { removeAllProducts } = basket;

  const removeProductsFromBasket = async () => {
    await removeAllProducts();
    notification.open({
      message: `Tous les produis  ont étés supprimés du panier}`,
      icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      duration: 1,
    });
  };

  const list = JSON.parse(localStorage.getItem("basket")) || [];
  return (
    <Popconfirm
      title="Souhaitez vous vider le panier？"
      placement={placement || "top"}
      icon={
        <QuestionCircleOutlined
          style={{ color: "red", cursor: list.length === 0 && "none" }}
        />
      }
      onConfirm={() => removeProductsFromBasket()}
      disabled={list.length === 0}
    >
      <DeleteOutlined
        style={{
          color: list.length > 0 ? color : "grey",
          fontSize: fontSize,
        }}
      />
    </Popconfirm>
  );
};

export default CleanBasket;
