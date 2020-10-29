import React, { useContext } from "react";
import { Popover, Popconfirm, Col, Row, Input } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/context";
import { useState } from "react";
import styleVariable from "../../styleVariable";

const RemoveSeveralProducts = ({ product }) => {
  const { basket } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const { decreaseProductsFromBasket } = basket;
  const productInBasket =
    JSON.parse(localStorage.getItem("basket")).find(
      (e) => product.id === e.id
    ) || null;

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const list = JSON.parse(localStorage.getItem("basket")) || [];

  return (
    <>
      {list.length > 0 && (
        <Popconfirm
          title={`Souhaitez vous supprimer tous les ${product.name} du panier`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => decreaseProductsFromBasket(product, product.num)}
        >
          <DeleteOutlined
            style={{ color: styleVariable.secondaryColor, fontSize: 20 }}
          />
        </Popconfirm>
      )}
    </>
  );
};

export default RemoveSeveralProducts;
