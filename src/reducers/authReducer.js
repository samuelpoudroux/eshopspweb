import { REGISTER, LOGOUT } from "../constants/login.js";

import { logout, register } from "../repository/auth";

const authReducer = (authState, action) => {
  switch (action.type) {
    case REGISTER:
      return register(authState, action);
    case LOGOUT:
      return logout(action.history);
    default:
      break;
  }
};
export default authReducer;
