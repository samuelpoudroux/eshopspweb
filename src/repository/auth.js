import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

const logout = (history) => {
  localStorage.removeItem("users");
  localStorage.removeItem("jwtData");
  notification.open({
    message: "Vous êtes deconnecté",
    icon: <SmileOutlined style={{ color: "#89ba17" }} />,
  });
  history.push("/");
  return { isLogged: false };
};
const register = async () => {};

export { logout, register };
