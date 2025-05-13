import { Navigate } from "react-router";

export function PortectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
}
