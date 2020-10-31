import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

const login = (authState, user, history) => {
  if (user.error) {
    return {
      isLoading: false,
      ...user,
      isLogged: false,
      error: user.error,
    };
  } else {
    return { isLoading: false, ...user, isLogged: true };
  }
};
const logout = (history) => {
  localStorage.removeItem("users");
  notification.open({
    message: "Vous êtes deconnecté",
    icon: <SmileOutlined style={{ color: "#89ba17" }} />,
  });
  history.push("/");
  return { isLogged: false };
};
const register = async () => {};

export { login, logout, register };
