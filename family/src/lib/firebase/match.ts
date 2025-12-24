import { db } from "./config";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  runTransaction, 
  doc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";

/**
 * Generates a unique 6-character alphanumeric code
 */
export const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Creates an invite record for the user manually (used in Match page)
 */
export const createInvite = async (uid: string, role: string) => {
  const code = generateInviteCode();
  const inviteRef = doc(db, "invites", code);
  
  await setDoc(inviteRef, {
    creatorId: uid,
    creatorRole: role,
    createdAt: serverTimestamp(),
  });
  
  return code;
};

/**
 * Links two users together by verifying an invite code
 */
export const joinFamily = async (partnerCode: string, currentUid: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("inviteCode", "==", partnerCode));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Invalid code. Please check with your partner.");
  }

  const partnerDoc = querySnapshot.docs[0];
  const partnerUid = partnerDoc.id;

  if (partnerUid === currentUid) {
    throw new Error("You cannot match with yourself.");
  }

  const currentUserRef = doc(db, "users", currentUid);
  const partnerUserRef = doc(db, "users", partnerUid);

  return await runTransaction(db, async (transaction) => {
    transaction.update(currentUserRef, { partnerId: partnerUid });
    transaction.update(partnerUserRef, { partnerId: currentUid });
    return true;
  });
};