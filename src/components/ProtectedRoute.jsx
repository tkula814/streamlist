import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;