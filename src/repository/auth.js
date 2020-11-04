import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

const login = (authState, user, history) => {
  if (user.error) {
    notification.open({
      message: user.error,
      icon: <SmileOutlined style={{ color: "red" }} />,
    });

    return { error: user.error };
  } else {
    localStorage.setItem(
      "users",
      JSON.stringify({
        isLoading: false,
        ...user,
        isLogged: true,
      })
    );
  }
};
const logout = (history) => {
  localStorage.removeItem("users");
  sessionStorage.removeItem("jwtData");
  notification.open({
    message: "Vous êtes deconnecté",
    icon: <SmileOutlined style={{ color: "#89ba17" }} />,
  });
  history.push("/");
  return { isLogged: false };
};
const register = async () => {};

export { login, logout, register };
