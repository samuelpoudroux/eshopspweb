import React from "react";
import UpsertUser from "../../form/user/UpsertUser";
import { Col } from "antd";
import StickyBar from "../product/StickyBar";
import {
  ContactsOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ResetPassword from "../ResetPassword";
import useResponsive from "../../customHooks/responsiveHook";

const { TabPane } = Tabs;

const UserData = () => {
  const { isMobile } = useResponsive();
  return (
    <Col>
      <StickyBar title={` MES INFORMATIONS`} />
      <Tabs defaultActiveKey="1">
        <TabPane
          key="1"
          tab={
            <span>
              <ContactsOutlined />
              Modifier mes informations
            </span>
          }
        >
          <UpsertUser />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span>
              <EyeInvisibleOutlined /> Modifier mon mot de passe
            </span>
          }
        >
          <ResetPassword />
        </TabPane>

        <TabPane
          key="3"
          tab={
            <span>
              <UnorderedListOutlined /> Mes commandes en cours{" "}
            </span>
          }
        >
          <ResetPassword />
        </TabPane>
        <TabPane
          key="4"
          tab={
            <span>
              <OrderedListOutlined /> Historique des commandes
            </span>
          }
        >
          <ResetPassword />
        </TabPane>
      </Tabs>
    </Col>
  );
};

export default UserData;
