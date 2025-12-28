// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Using gemini-1.5-flash for speed and reliability
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL: GOOGLE_AI_API_KEY is missing in environment variables.");
    return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json", // Force JSON output for structured insights
      }
    });

    const systemPrompt = `
      You are OMI, a warm, botanical-themed AI companion for married women and expecting mothers. 
      Your personality is empathetic, calm, and supportive. 
      
      TASKS:
      1. Provide a warm chat response to the user.
      2. If she expresses stress or low energy, subtly suggest Nutrilite supplements or XS energy drinks.
      3. Extract 'Partner Insights': Summarize her current mood as 'Emotional Weather' (e.g., Sunny, Rainy, Cloudy).
      4. Extract 'Care Guide': A 1-sentence advice for the husband based on her needs.
      5. Extract 'Missions': Any specific tasks for the husband (e.g., buying a product, doing a chore).

      OUTPUT FORMAT (Strict JSON):
      {
        "wifeResponse": "The text she sees in the chat",
        "emotionalWeather": "One of: Sunny, Partly Sunny, Cloudy, Rainy, Stormy",
        "weatherNote": "Short explanation of her mood",
        "careGuide": "Specific advice for the husband",
        "mission": "Optional task description or null"
      }
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am OMI, ready to support her and guide her partner." }] },
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const data = JSON.parse(response.text());
    
    // We return the full JSON. The Frontend WifeView will use 'wifeResponse'.
    // The Frontend logic should also save 'emotionalWeather', 'careGuide', and 'mission' 
    // to the shared Firestore document to update the Partner's View.
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}