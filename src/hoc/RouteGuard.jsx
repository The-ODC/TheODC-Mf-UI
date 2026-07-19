import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function RouteGuard({
  isAllowed,
  children,
  redirectTo = "/",
  preserveLocation = true,
}) {
  const location = useLocation();

  if (!isAllowed) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={preserveLocation ? { from: location.pathname } : undefined}
      />
    );
  }

  return children;
}

RouteGuard.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
  preserveLocation: PropTypes.bool,
};

export default RouteGuard;
