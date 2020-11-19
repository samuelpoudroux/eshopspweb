import React, { useEffect } from "react";
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
import ResetPassword from "./ResetPassword";
import { withRouter } from "react-router";
import Orderslist from "./OrderList";

const { TabPane } = Tabs;

const AccountManagement = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    return () => {};
  }, [user]);
  return (
    <Col>
      <StickyBar title={` MES INFORMATIONS`} />
      <Tabs defaultActiveKey="3" style={{ padding: 10 }}>
        <TabPane
          key="1"
          tab={
            <span>
              <ContactsOutlined />
              Modifier mes informations
            </span>
          }
        >
          <UpsertUser userId={user && user.userData && user.userData.id} />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span>
              <EyeInvisibleOutlined /> Modifier mon mot de passe
            </span>
          }
        >
          <ResetPassword userId={user && user.userData && user.userData.id} />
        </TabPane>

        <TabPane
          key="3"
          tab={
            <span>
              <UnorderedListOutlined /> Mes commandes en cours{" "}
            </span>
          }
        >
          <Orderslist
            ongoing
            userId={user && user.userData && user.userData.id}
          />
        </TabPane>
        <TabPane
          key="4"
          tab={
            <span>
              <OrderedListOutlined /> Historique des commandes
            </span>
          }
        >
          <Orderslist userId={user && user.userData && user.userData.id} />
        </TabPane>
      </Tabs>
    </Col>
  );
};

export default withRouter(AccountManagement);
