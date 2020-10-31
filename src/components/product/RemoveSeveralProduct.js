import React, { useContext } from "react";
import { Popconfirm, notification } from "antd";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";

const RemoveSeveralProducts = ({ product }) => {
  const { basket } = useContext(AppContext);
  const { decreaseProductsFromBasket } = basket;
  const list = JSON.parse(localStorage.getItem("basket")) || [];

  const removeProductsFromBasket = async () => {
    await decreaseProductsFromBasket(product);
    notification.open({
      message: `Tous les produis ${product.name} ont étés supprimés du panier}`,
      icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      duration: 1,
    });
  };
  return (
    <>
      {list.length > 0 && (
        <Popconfirm
          title={`Souhaitez vous supprimer tous les produits ${product.name} du panier`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => removeProductsFromBasket()}
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
