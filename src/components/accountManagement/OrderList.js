import React, { useEffect } from "react";
import Axios from "axios";
import { Row, Col, Spin } from "antd";
import { useState } from "react";
import { getDateWithHours } from "../../helpers/Date";
import styleVariable from "../../styleVariable";
import OrderDetailsPopup from "../orderResume/OrderDetailsPopup";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_ORDER,
  REACT_APP_API_ONGOING_ORDERS,
  REACT_APP_API_HISTORY_ORDERS,
} = process.env;

const Orderslist = ({ userId, ongoing }) => {
  const [Orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const [order, setOrder] = useState(undefined);

  const goOrderDetails = (orderValue) => {
    setOrder(orderValue);
    setOrderDetailsVisible(true);
  };

  const API_END = ongoing
    ? REACT_APP_API_ONGOING_ORDERS
    : REACT_APP_API_HISTORY_ORDERS;

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(
        REACT_APP_API_DOMAIN + REACT_APP_API_ORDER + API_END + userId
      );
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    return () => {};
  }, [reload]);
  return (
    <Col span={24} gutter={[0, 30]}>
      {Orders.length === 0 && (
        <h1 style={{ textAlign: "center" }}>
          Pas de commandes {ongoing ? "en cours" : "dans l'historique"}
        </h1>
      )}
      {
        <OrderDetailsPopup
          orderDetailsVisible={orderDetailsVisible}
          setOrderDetailsVisible={setOrderDetailsVisible}
          order={order}
          setReload={setReload}
          reload={reload}
        />
      }
      <Row justify="start">
        {Orders &&
          Orders.map((order) => (
            <Col
              xs={23}
              xxl={6}
              className="productCard"
              style={{ padding: 20, cursor: "pointer" }}
              onClick={() => goOrderDetails(order)}
              key={order.id}
            >
              <b
                style={{
                  textAlign: "center",
                  color: styleVariable.thirdColor,
                }}
              >
                {order.name ? order.name : `Commande numéro ${order.id}`}
              </b>
              <Row>
                Commande passée le{" "}
                <span style={{ color: styleVariable.secondaryColor }}>
                  {getDateWithHours(order.orderDate)}
                </span>
              </Row>
            </Col>
          ))}
        {isLoading && <Spin />}
      </Row>
    </Col>
  );
};

export default Orderslist;
