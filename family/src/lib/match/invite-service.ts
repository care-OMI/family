// src/lib/match/invite-service.ts
import { db } from "@/lib/firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Generates a random 6-digit alphanumeric code
 */
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Creates a pending invite in Firestore
 * @param creatorId - The UID of the user generating the code
 * @param role - The role of the creator ('wife' | 'husband')
 */
export const createInvite = async (creatorId: string, role: string) => {
  const inviteCode = generateCode();
  const inviteRef = doc(db, "invites", inviteCode);

  await setDoc(inviteRef, {
    creatorId,
    creatorRole: role,
    createdAt: serverTimestamp(),
  });

  return inviteCode;
};