import React from "react";
import { Tabs, Col, Tag } from "antd";
import styleVariable from "../../styleVariable";
import { upperCase } from "../../helpers/UpperCase";

const { TabPane } = Tabs;

const ProductDetailsTabs = ({ category, description }) => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Description" key="1">
      <Col>
        <Tag color={styleVariable.secondaryColor}>{upperCase(category)}</Tag>
      </Col>
      <p style={{ marginTop: 20 }}>
        {description !== "undefined" && description}
      </p>{" "}
    </TabPane>
    <TabPane tab="Livraison" key="2">
      Contenu relatif à la livraison
    </TabPane>
    <TabPane tab="Retour" key="3">
      Content relatif au retour
    </TabPane>
  </Tabs>
);

export default ProductDetailsTabs;
