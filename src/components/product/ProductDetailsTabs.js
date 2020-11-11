import React from "react";
import { Tabs, Col, Tag } from "antd";
import styleVariable from "../../styleVariable";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";

const { TabPane } = Tabs;

const ProductDetailsTabs = ({ category, description }) => {
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
        tab="Présentation"
        key="1"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        <p>{description !== "undefined" && description}</p>{" "}
      </TabPane>
      <TabPane
        tab="Proprieté et utilisation"
        key="2"
        style={{ padding: 20, paddingLeft: 0 }}
      >
        Content relatif au retour
      </TabPane>
      <TabPane tab="Livraison" key="3" style={{ padding: 20, paddingLeft: 0 }}>
        Contenu relatif à la livraison
      </TabPane>
      <TabPane tab="Retour" key="4" style={{ padding: 20, paddingLeft: 0 }}>
        Content relatif au retour
      </TabPane>
    </Tabs>
  );
};

export default ProductDetailsTabs;
