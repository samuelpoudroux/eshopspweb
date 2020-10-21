import React, { useContext } from "react";
import { Popover, Popconfirm, Col, Row, Input } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/context";
import { useState } from "react";

const RemoveSeveralProducts = ({ product }) => {
  const { basket } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [numberToDelete, setNumberToDelete] = useState(0);
  const { decreaseProductsFromBasket } = basket;
  const productInBasket =
    JSON.parse(localStorage.getItem("basket")).find(
      (e) => product.id === e.id
    ) || null;

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const list = JSON.parse(localStorage.getItem("basket")) || [];

  const numberHandleChange = (value) => {
    if (parseInt(value) > productInBasket.num) {
      setNumberToDelete(productInBasket.num);
    } else {
      setNumberToDelete(value);
    }
  };

  const choice = () => (
    <Row>
      <Col span={24}>
        <Row align="middle">
          <Col span={18}>
            <Input disabled placeholder="Tous les produits" />
          </Col>
          <Popconfirm
            title={`Souhaitez vous supprimer tous les ${product.name} du panier`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => decreaseProductsFromBasket(product, product.num)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={18}>
            <Input
              max={product.num}
              min={0}
              type="number"
              onChange={(e) => numberHandleChange(e.target.value)}
              placeholder={`Combien de ${product.name}`}
            />
          </Col>
          <Popconfirm
            title={`Souhaitez vous supprimer ${
              numberToDelete + " " + product.name
            } du panier`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() =>
              decreaseProductsFromBasket(product, numberToDelete)
            }
          >
            <DeleteOutlined style={{ color: "green" }} />
          </Popconfirm>
        </Row>
      </Col>
    </Row>
  );

  return (
    <>
      {list.length > 0 && (
        <Popover
          content={choice}
          title={`Souhaitez vous supprimer des ${product.name} du panier`}
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <DeleteOutlined style={{ fontSize: "1.3em", color: "#89ba17" }} />
        </Popover>
      )}
    </>
  );
};

export default RemoveSeveralProducts;
