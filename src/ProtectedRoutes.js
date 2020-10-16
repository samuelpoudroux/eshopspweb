import React from 'react';
import { Redirect } from 'react-router-dom';
import useIsAdmin from './customHooks/isAdminHooks';

const ProtectedRoute = ({ Component }) => {
  const { isAdmin } = useIsAdmin();
  return isAdmin ? <Component /> : <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
