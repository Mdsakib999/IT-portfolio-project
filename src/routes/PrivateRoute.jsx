import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Loading from "../Utils/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
