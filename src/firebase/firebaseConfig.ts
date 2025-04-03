import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Replace with your Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaazsoZ4b4KN7Jeu8QqKSPUmHQPQL5ppE",
    authDomain: "konektiv-84f56.firebaseapp.com",
    projectId: "konektiv-84f56",
    storageBucket: "konektiv-84f56.firebasestorage.app",
    messagingSenderId: "346071737781",
    appId: "1:346071737781:web:b31d0f1f4720e334d2e5fc",
    measurementId: "G-N0GF8NHRFQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const handleNewUser = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      type: "individual", // Default type
      profile: { name: user.displayName || "" },
      subscription: { tier: "free", expiry: new Date() },
      kycStatus: "pending",
      verified: false
    });
  }
};