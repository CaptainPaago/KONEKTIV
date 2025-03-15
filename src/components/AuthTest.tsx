import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

export default function AuthTest() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", auth.currentUser?.email);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
}