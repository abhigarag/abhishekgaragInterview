import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage or any other storage

  return token ? <Outlet/> : <Navigate to={redirectTo} />
};

export default PrivateRoute;
