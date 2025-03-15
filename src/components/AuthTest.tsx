import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Inside the component:
const writeTestData = async () => {
  if (!auth.currentUser) return;
  await setDoc(doc(db, "test", "testDoc"), {
    message: "Firestore connection works!",
    timestamp: new Date(),
  });
  console.log("Data written!");
};

// Add a button:
<button onClick={writeTestData}>Write Test Data</button>
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