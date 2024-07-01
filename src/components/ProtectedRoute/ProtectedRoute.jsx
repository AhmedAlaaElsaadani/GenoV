
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/authContext";

export default function ProtectedRoute(props) {
  const { isRegistered } = useContext(authContext);
  useEffect(() => {
    console.log("HI",isRegistered);

  }, []);

  if (isRegistered) {
      return props.children;
} else {
    return <Navigate to="/" />;
  }
}
