import React, { useState } from "react";
import {
  Row,
  Col,
  Drawer,
  Spin,
  Button,
  Input,
  Form,
  notification,
} from "antd";
import useResponsive from "../../customHooks/responsiveHook";
import { withRouter } from "react-router";
import styleVariable from "../../styleVariable";
import PopupProductCard from "../product/PopupProductCard";
import { getTotalPrice } from "../../repository/product";
import Axios from "axios";
import { getDateWithHours } from "../../helpers/Date";

import { SmileOutlined } from "@ant-design/icons";

const { REACT_APP_API_DOMAIN, REACT_APP_API_ORDER } = process.env;
const OrderDetailsPopup = ({
  history,
  setOrderDetailsVisible,
  orderDetailsVisible,
  order,
  setReload,
  reload,
}) => {
  const productList = (order && order.products && order.products) || [];
  const { isMobile } = useResponsive();
  const [alterName, setAlterName] = useState(false);

  const onFinish = async (values) => {
    try {
      const { data } = await Axios.put(
        REACT_APP_API_DOMAIN + REACT_APP_API_ORDER + order.id,
        values
      );

      notification.open({
        message: data,
        icon: <SmileOutlined style={{ color: styleVariable.secondaryColor }} />,
      });

      setReload(!reload);
    } catch (error) {
      notification.open({
        message: error.message,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const drawerHeader = () => {
    if (!order) {
      return <Spin />;
    }
    return (
      <Col span={24}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            name: order.name
              ? order.name
              : `Commande numéro ${order && order.id}`,
          }}
        >
          <Row style={{ paddingTop: "2%" }} align="middle">
            <Col xxl={12} xs={24}>
              <Row align="middle">
                {!alterName && (
                  <b
                    style={{
                      fontSize: isMobile ? "1em" : "1.3em",
                      color: styleVariable.secondaryColor,
                    }}
                  >
                    Récapitulatif de ma commande{" "}
                    {order.name ? order.name : order && order.id}{" "}
                  </b>
                )}

                {alterName && (
                  <Form.Item
                    label="Nom de la commande"
                    name="name"
                    rules={[
                      {
                        required: true,
                        min: 4,
                        message:
                          "Nom de la commande oligatoire avec minimum 4 caractéres",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input bordered={false} className="inputStyle" />
                  </Form.Item>
                )}
              </Row>
            </Col>
            <Col xxl={12} xs={24}>
              <Row justify="space-between" align="middle">
                <i style={{ color: styleVariable.thirdColor }}>
                  Commandée le <span>{getDateWithHours(order.orderDate)}</span>
                </i>
              </Row>
            </Col>
            <Col span={24}>
              <Row
                align="middle"
                justify="space-between"
                style={{ paddingTop: 15 }}
              >
                {!alterName && (
                  <Button onClick={() => setAlterName(true)}>
                    Modifier le nom de ma commande
                  </Button>
                )}
                {alterName && (
                  <Row justify="center">
                    <Button htmlType="submit">Valider la modification</Button>
                    <Button onClick={() => setAlterName(false)}>Annuler</Button>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  };
  console.log("productList", productList);

  return (
    <Drawer
      title={drawerHeader()}
      closable={true}
      placement="right"
      width={isMobile ? 330 : 900}
      onClose={() => setOrderDetailsVisible(false)}
      visible={orderDetailsVisible}
      height={"auto"}
      key={"top"}
      closable={false}
      bodyStyle={{
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      style={{ zIndex: 26, height: "100%", overflowY: "scroll" }}
      footerStyle={{ padding: "0px" }}
      onTouchMove={() => setOrderDetailsVisible(false)}
    >
      <Col lg={24} style={{ padding: "10px" }}>
        <h3 style={{ textAlign: "center", color: styleVariable.mainColor }}>
          {`Produits dans la commande ${
            order && order.name ? order.name : `numéro ${order && order.id}`
          }`}
        </h3>
        <Row justify={isMobile && "center"}>
          {productList && productList.length > 0 ? (
            productList.map(
              (product) =>
                product.num !== 0 && (
                  <PopupProductCard
                    history={history}
                    key={product.id}
                    product={product}
                    orderEverSent
                  />
                )
            )
          ) : (
            <Col span={24}>
              <Row justify="center">
                <Spin />
              </Row>
            </Col>
          )}
        </Row>
        <Row
          align="middle"
          justify="start"
          style={{
            color: "white",
            background: styleVariable.secondaryColor,
            padding: 20,
            marginTop: 20,
          }}
          gutter={(20, 50)}
        >
          <Col lg={8} xs={24}>
            <Row justify={isMobile && "center"}>
              <b>Total de ma commande: {getTotalPrice(productList)}€</b>
            </Row>
          </Col>
          <Col lg={16} xs={24} style={{ marginTop: isMobile && 30 }}>
            <Row justify="center">
              <Button
                style={{
                  color: "white",
                  background: styleVariable.secondaryColor,
                }}
              >
                Imprimer ma facture
              </Button>
              <Button
                style={{
                  color: "white",
                  background: styleVariable.secondaryColor,
                }}
              >
                Repasser la même commande{" "}
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Drawer>
  );
};
export default withRouter(OrderDetailsPopup);
