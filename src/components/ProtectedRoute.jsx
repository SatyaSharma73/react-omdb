import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./Context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  console.log("here",user);
  if (!user) {
    console.log(user);
    
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
