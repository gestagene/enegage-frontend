import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!isLoggedIn)
    return <Navigate to="/" state={{ from: location }} replace />;

  return children;
}
