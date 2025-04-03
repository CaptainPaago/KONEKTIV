import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { handleNewUser } from './firebase/firebaseConfig'; // Ensure this is exported from your firebaseConfig
import AuthTest from './components/AuthTest';
import ProtectedRoute from './components/ProtectedRoute';
import Onboarding from './components/Onboarding'; // Create this component next

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth state listener with user profile creation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleNewUser(user);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading KONEKTIV...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <nav style={{ marginBottom: '2rem' }}>
          {currentUser && (
            <>
              <a href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</a>
              <a href="/profile" style={{ marginRight: '1rem' }}>Profile</a>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>KONEKTIV Business Platform</h1>
              <p>
                {currentUser 
                  ? `Logged in as: ${currentUser.email}` 
                  : "Welcome! Sign in to continue"}
              </p>
              <AuthTest />
            </div>
          } />

          {/* Onboarding Flow */}
          <Route path="/onboarding" element={
            <ProtectedRoute requiredRole={null}>
              <Onboarding />
            </ProtectedRoute>
          } />

          {/* Protected Routes */}
          <Route path="/corporate-dashboard" element={
            <ProtectedRoute requiredRole="corporate">
              <h2>Corporate Dashboard</h2>
              {/* Add corporate components here */}
            </ProtectedRoute>
          } />

          <Route path="/individual-dashboard" element={
            <ProtectedRoute requiredRole="individual">
              <h2>Individual Dashboard</h2>
              {/* Add individual components here */}
            </ProtectedRoute>
          } />

          {/* Fallback Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


