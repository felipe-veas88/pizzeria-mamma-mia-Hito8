import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
