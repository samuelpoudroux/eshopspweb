import { LOGIN, REGISTER, LOGOUT } from '../constants/login.js';

import { login, logout, register } from '../repository/auth';

const authReducer = (authState, action) => {
  switch (action.type) {
    case LOGIN:
      return login(authState, action.user, action.history);
    case REGISTER:
      return register(authState, action);
    case LOGOUT:
      return logout(action.history);
    default:
      break;
  }
};
export default authReducer;
