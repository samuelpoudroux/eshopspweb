import React, { useContext } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined, DeleteFilled } from "@ant-design/icons";
import { AppContext } from "../../context/context";
import styleVariable from "../../styleVariable";

const CleanBasket = ({ color = "white", fontSize = "20px" }) => {
  const { basket } = useContext(AppContext);
  const { removeAllProducts } = basket;

  const list = JSON.parse(localStorage.getItem("basket")) || [];
  return (
    <>
      {list.length > 0 && (
        <Popconfirm
          title="Souhaitez vous vider le panier？"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => removeAllProducts()}
        >
          <DeleteFilled style={{ color: color, fontSize: fontSize }} />
        </Popconfirm>
      )}
    </>
  );
};

export default CleanBasket;
