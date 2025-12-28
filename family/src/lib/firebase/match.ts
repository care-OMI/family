// src/lib/firebase/match.ts
import { db, auth } from "./config";
import { 
  collection, query, where, getDocs, 
  doc, updateDoc, runTransaction, serverTimestamp 
} from "firebase/firestore";

export const sendLinkRequest = async (targetCode: string, senderUid: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("inviteCode", "==", targetCode));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) throw new Error("Invite code not found.");
  
  const targetDoc = querySnapshot.docs[0];
  const targetUid = targetDoc.id;

  if (targetUid === senderUid) throw new Error("You cannot link with yourself.");

  const targetUserRef = doc(db, "users", targetUid);
  await updateDoc(targetUserRef, {
    pendingInvite: {
      fromUid: senderUid,
      fromName: auth.currentUser?.displayName || "Partner",
      status: "pending"
    }
  });
  return true;
};

export const respondToInvite = async (accept: boolean) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const receiverRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDocs(query(collection(db, "users"), where("uid", "==", currentUser.uid)));
  const pendingData = userSnap.docs[0].data().pendingInvite;

  if (!pendingData) return;

  if (!accept) {
    await updateDoc(receiverRef, { pendingInvite: null });
    return;
  }

  const senderRef = doc(db, "users", pendingData.fromUid);

  return await runTransaction(db, async (transaction) => {
    transaction.update(receiverRef, { partnerId: pendingData.fromUid, pendingInvite: null });
    transaction.update(senderRef, { partnerId: currentUser.uid });
    return true;
  });
};