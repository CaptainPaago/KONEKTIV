import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

export default function Onboarding() {
  const [userType, setUserType] = useState<"individual" | "corporate">("individual");

  const handleSubmit = async () => {
    if (!auth.currentUser) return;
    
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      type: userType,
    });
    // Proceed to KYC step
  };

  return (
    <div>
      <h2>Choose Account Type</h2>
      <button onClick={() => setUserType("individual")}>
        Individual
      </button>
      <button onClick={() => setUserType("corporate")}>
        Corporate
      </button>
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}