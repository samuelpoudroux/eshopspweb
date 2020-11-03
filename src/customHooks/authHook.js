import { useEffect, useState, useReducer } from "react";
import { LOGIN, REGISTER, LOGOUT } from "../constants/login.js";
import Axios from "axios";
import authReducer from "../reducers/authReducer";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_AUTH_LOGIN,
  REACT_APP_API_AUTH,
} = process.env;

const useAuth = () => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoading: false,
    isLogged: false,
  });

  const login = async (user, history) => {
    const localData = JSON.parse(localStorage.getItem("users"));
    let data;
    if (!localData || (localData && localData.error)) {
      const { data: userData } = await Axios.post(
        REACT_APP_API_DOMAIN + REACT_APP_API_AUTH + REACT_APP_API_AUTH_LOGIN,
        user,
        { withCredentials: true }
      );
      sessionStorage.setItem("jwtData", userData.jwt);
      delete userData.jwt;
      const { error } = userData;
      if (!error) {
        localStorage.setItem(
          "users",
          JSON.stringify({ ...userData, isLoading: false, isLogged: true })
        );

        data = { ...userData, isLoading: false, isLogged: true };
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify({ error: error, isLoading: false, isLogged: false })
        );
        data = { error: error };
      }
    } else {
      data = { localData, isLoading: false };
    }
    return dispatch({
      type: LOGIN,
      user: data,
      history,
    });
  };

  const register = (user) => {
    return dispatch({
      type: REGISTER,
      user,
    });
  };
  const logout = (history) => {
    return dispatch({
      type: LOGOUT,
      history,
    });
  };

  return { auth, login, logout, register };
};

export default useAuth;
