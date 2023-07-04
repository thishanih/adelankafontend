import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  let userInfo = JSON.parse(localStorage.getItem("user"));

  if (userInfo) {
    return <Navigate replace to="/post" />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
