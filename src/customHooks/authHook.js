import { useReducer } from "react";
import { LOGIN, REGISTER, LOGOUT } from "../constants/login.js";
import Axios from "axios";
import authReducer from "../reducers/authReducer";
import { useState } from "react";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_AUTH_LOGIN,
  REACT_APP_API_AUTH,
} = process.env;

const useAuth = () => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoading: false,
    isLogged: false,
    error: true,
  });

  const [userData, setUserData] = useState({
    isLoading: true,
    data: {},
    error: false,
  });

  const login = async (user, history) => {
    const { data: userData } = await Axios.post(
      REACT_APP_API_DOMAIN + REACT_APP_API_AUTH + REACT_APP_API_AUTH_LOGIN,
      user,
      { withCredentials: true }
    );
    userData.accessToken &&
      localStorage.setItem("jwtData", userData.accessToken);
    delete userData.accessToken;
    if (!userData.error) {
      localStorage.setItem(
        "users",
        JSON.stringify({ ...userData, isLoading: false, isLogged: true })
      );
      setUserData({ isLoading: false, error: false, data: userData });
    }
    return {
      ...userData,
      isLoading: false,
      isLogged: true,
      error: userData.error,
    };
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

  return { auth, login, logout, register, userData };
};

export default useAuth;
