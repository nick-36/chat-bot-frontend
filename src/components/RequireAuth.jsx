import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RequireAuth = () => {
  const authToken = cookies.get("token");

  const location = useLocation();

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
