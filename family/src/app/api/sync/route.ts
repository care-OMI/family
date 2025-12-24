// src/app/api/sync/route.ts
import { NextResponse } from "next/server";
import { generateHusbandBriefing } from "@/lib/ai/agent";

/**
 * Endpoint to process wife's research/wish and generate husband-ready tasks.
 */
export async function POST(req: Request) {
  try {
    const { productName, searchHistory } = await req.json();

    if (!productName) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    // 1. Invoke the AI Agent to translate intent
    // This uses the generateHusbandBriefing logic we wrote earlier
    const aiInsight = await generateHusbandBriefing(productName, searchHistory);

    // 2. Build the synchronized object
    const syncData = {
      id: `item_${Date.now()}`,
      title: productName,
      addedBy: 'wife',
      status: 'pending',
      aiBrief: aiInsight.brief,
      aiSuggestion: aiInsight.suggestion,
      createdAt: Date.now(),
    };

    /** * TODO: Once Firebase is ready:
     * await addDoc(collection(db, "wishlists"), syncData);
     */

    console.log("Sync success - Payload generated for husband:", syncData);

    return NextResponse.json({ 
      success: true, 
      data: syncData 
    });

  } catch (error) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}