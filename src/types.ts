import { Timestamp } from "firebase/firestore";
export type UserType = "individual" | "corporate";
export type SubscriptionTier = "free" | "basic" | "proconnect" | "prestige";
export type KYCStatus = "pending" | "verified" | "rejected";

export interface User {
  email: string;
  type: UserType;
  profile: {
    name: string;
    industry?: string;
    location?: string;
  };
  subscription: {
    tier: SubscriptionTier;
    expiry: Timestamp; // Firestore timestamp type
  };
  kycStatus: KYCStatus;
  verified: boolean;
}