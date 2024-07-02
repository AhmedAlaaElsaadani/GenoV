import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/authContext";

export default function InverseProtectedRoute(props) {
  const { isRegistered } = useContext(authContext);

  if (isRegistered) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}
