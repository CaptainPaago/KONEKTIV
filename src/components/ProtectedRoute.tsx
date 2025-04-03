import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole: "individual" | "corporate";
}) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  // Replace with actual user type check (from Firestore)
  const userType = "individual"; // Temporary
  return userType === requiredRole ? children : <Navigate to="/unauthorized" />;
}