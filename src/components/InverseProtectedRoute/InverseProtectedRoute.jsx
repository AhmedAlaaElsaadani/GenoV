import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/authContext";

export default function InverseProtectedRoute(props) {
    let {isRegistered ,setToken}=useContext(authContext);
    setToken(localStorage.getItem("token"));
    if (isRegistered) {
      return <Navigate to="/" />;
    } else {
      return props.children;
    }
  }
