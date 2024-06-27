import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/authContext";

export default function InverseProtectedRoute(props) {
  const { isRegistered, setToken } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  if (isRegistered) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}
