import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import AuthTest from './components/AuthTest';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { User, UserType } from "../types";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>KONEKTIV Setup Test</h1>
      <p>
        {userEmail 
          ? `Logged in as: ${userEmail}` 
          : "Not logged in"}
      </p>
      <AuthTest />
    </div>
  );
}

export default App;

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      await handleNewUser(user); // Creates profile if new
      setUserEmail(user.email);
    } else {
      setUserEmail(null);
    }
  });
  return unsubscribe;
}, []);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/corporate-dashboard" element={
          <ProtectedRoute requiredRole="corporate">
            <h2>Corporate Dashboard</h2>
          </ProtectedRoute>
        }/>
        <Route path="/individual-dashboard" element={
          <ProtectedRoute requiredRole="individual">
            <h2>Individual Dashboard</h2>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}