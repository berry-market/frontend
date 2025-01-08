import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("Authorization");
  const { user } = useUser();

  // 인증 상태 확인
  const isAuthenticated = token && user;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
