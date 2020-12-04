import React, { useState } from "react";
import { Tabs, Col, Tag, Row } from "antd";
import styleVariable from "../../styleVariable";
import useResponsive from "../../customHooks/responsiveHook";
import {
  PlusOutlined,
  MessageOutlined,
  MacCommandOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { ProductNotation } from "./ProductNotation";
import { CustomerNotations } from "./CustomerNotations";

const { TabPane } = Tabs;

const ProductDetailsTabs = ({ description, formule, advice, uid }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  const [reload, setReload] = useState(false);
  const { isMobile } = useResponsive();
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ width: " 100%", paddingLeft: 15 }}
      size="large"
      tabBarStyle={{
        color: styleVariable.mainColor,
      }}
    >
      <TabPane
        tab={
          <span>
            <ExceptionOutlined
              style={{ color: styleVariable.secondaryColor }}
            />{" "}
            Description
          </span>
        }
        key="1"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        <div
          style={{ padding: 20 }}
          id="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <MacCommandOutlined
              style={{ color: styleVariable.secondaryColor }}
            />{" "}
            Compositions
          </span>
        }
        key="2"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        <div
          style={{ padding: 20 }}
          id="formule"
          dangerouslySetInnerHTML={{ __html: formule }}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <PlusOutlined style={{ color: styleVariable.secondaryColor }} />{" "}
            Conseils
          </span>
        }
        key="3"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        <div id="advice" dangerouslySetInnerHTML={{ __html: advice }} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <MessageOutlined style={{ color: styleVariable.secondaryColor }} />{" "}
            Avis Clients
          </span>
        }
        key="4"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        <Col span={24}>
          <h2 style={{ textAlign: "center" }}>Avis clients</h2>
          <Row justify="center">
            <CustomerNotations reload={reload} productId={uid} />
          </Row>
        </Col>
      </TabPane>
      {user && user.userData && (
        <TabPane
          tab={
            <span>
              <MessageOutlined
                style={{ color: styleVariable.secondaryColor }}
              />{" "}
              Donner son avis
            </span>
          }
          key="5"
          style={{ padding: 20, paddingLeft: 0 }}
        >
          <Col span={24}>
            <h2 style={{ textAlign: "center" }}>Je donne mon avis</h2>
            <Row justify="center">
              <ProductNotation
                productId={uid}
                userId={user && user.userData.id}
                setReload={setReload}
                reload={reload}
              />
            </Row>
          </Col>
        </TabPane>
      )}
    </Tabs>
  );
};

export default ProductDetailsTabs;
