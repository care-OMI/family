// src/lib/match/match-service.ts
import { db } from "@/lib/firebase/config";
import { doc, runTransaction, getDoc } from "firebase/firestore";

/**
 * Performs the atomic handshake to link two users
 * @param inviteCode - The code entered by the partner
 * @param joinerId - The UID of the user entering the code
 * @param joinerRole - The role of the user entering the code
 */
export const performHandshake = async (inviteCode: string, joinerId: string, joinerRole: string) => {
  const inviteRef = doc(db, "invites", inviteCode);
  const joinerRef = doc(db, "users", joinerId);

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Check if invite exists
      const inviteSnap = await transaction.get(inviteRef);
      if (!inviteSnap.exists()) {
        throw new Error("Invalid or expired invite code.");
      }

      const { creatorId, creatorRole } = inviteSnap.data();

      // 2. Prevent matching the same role (e.g., Husband matching with Husband)
      if (creatorRole === joinerRole) {
        throw new Error("You cannot match with someone of the same role.");
      }

      const creatorRef = doc(db, "users", creatorId);

      // 3. Update Creator's document: set partnerId
      transaction.update(creatorRef, { partnerId: joinerId });

      // 4. Update Joiner's document: set partnerId
      // Use set with merge: true if the document might not exist yet
      transaction.set(joinerRef, { partnerId: creatorId, role: joinerRole }, { merge: true });

      // 5. Delete the temporary invite code
      transaction.delete(inviteRef);
    });

    return { success: true };
  } catch (error: any) {
    console.error("Handshake failed:", error.message);
    return { success: false, error: error.message };
  }
};