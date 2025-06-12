import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Loading from "../Utils/Loading";

export const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  //   console.log(isAdmin);
  const location = useLocation();

  if (loading) return <Loading />;

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};
