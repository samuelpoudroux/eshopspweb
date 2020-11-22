import React from "react";
import { Tabs, Col, Tag } from "antd";
import styleVariable from "../../styleVariable";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";
import {
  PlusOutlined,
  MessageOutlined,
  MacCommandOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const ProductDetailsTabs = ({ description, formule, advice }) => {
  const { isMobile } = useResponsive();
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ width: " 100%", paddingLeft: 20 }}
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
        <div id="formule" dangerouslySetInnerHTML={{ __html: formule }} />
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
        <div dangerouslySetInnerHTML={{ __html: advice }} />
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
        Avis Clients
      </TabPane>
    </Tabs>
  );
};

export default ProductDetailsTabs;
