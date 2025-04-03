import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import AuthTest from './components/AuthTest';
import { useEffect, useState } from 'react';

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