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
  const { removeProductFromBasket } = basket;
  const { basketList } = basket;

  const removeAll = async () => {
    await removeProductFromBasket(product);
    notification.open({
      message: `Tous les produis ${product.name} ont étés supprimés du panier}`,
      icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      duration: 1,
    });
  };
  return (
    <>
      {basketList && basketList.length > 0 && (
        <Popconfirm
          title={`Souhaitez vous supprimer tous les produits ${product.name} du panier`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => removeAll()}
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
