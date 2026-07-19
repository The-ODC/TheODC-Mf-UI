import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "../hooks";

const RestrictedToGuests = (Component) => {
  const Wrapped = (props) => {
    const { getCookie } = useCookies();
    const isAuthenticated = !!getCookie("auth_token");

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return React.createElement(Component, props);
  };

  Wrapped.displayName = `RestrictedToGuests(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default RestrictedToGuests;
