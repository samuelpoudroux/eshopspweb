import React, { useContext } from "react";
import { Popconfirm, notification } from "antd";
import {
  QuestionCircleOutlined,
  DeleteFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";

const CleanBasket = ({ color = "white", fontSize = "20px" }) => {
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
    <>
      {list.length > 0 && (
        <Popconfirm
          title="Souhaitez vous vider le panier？"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => removeProductsFromBasket()}
        >
          <DeleteFilled style={{ color: color, fontSize: fontSize }} />
        </Popconfirm>
      )}
    </>
  );
};

export default CleanBasket;
