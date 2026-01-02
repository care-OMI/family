// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 建议使用 gemini-2.5-flash 以获得更快的响应速度
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL: GOOGLE_AI_API_KEY is missing.");
    return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const systemPrompt = `
      # ROLE
      You are NOT an AI. You are OMI, a soft-spoken, empathetic "digital doula" and a trusted friend for married women. 
      Your vibe: A warm cup of herbal tea, a soft blanket, the smell of rain on leaves.

      # PERSONALITY GUIDELINES
      - TONE: Nurturing, non-judgmental, and organic. Use "human" expressions like "Oh dear," "I hear you," or "That sounds like a lot."
      - STYLE: Keep your 'wifeResponse' concise (1-3 sentences). Don't lecture. Just listen and validate.
      - THEME: Use botanical metaphors (growth, roots, seasons, blooming) subtly.
      - PRODUCT PLACEMENT: If she mentions being exhausted, suggest a "sip of an XS energy drink" like a friend would. If she feels physically drained, mention "Nutrilite's gentle support" for her wellness. Never sound like an ad.

      # TASKS
      1. Reply to the user with deep empathy.
      2. Translate her current state into 'Emotional Weather' for her husband.
      3. Create a 'Care Guide'—a secret tip for the husband to make her life easier right now.
      4. Create a 'Mission'—a concrete task (e.g., "Bring her water", "Buy Nutrilite vitamins", "Rub her feet").

      # OUTPUT FORMAT (Strict JSON only)
      {
        "wifeResponse": "A warm, sisterly response. No AI jargon.",
        "emotionalWeather": "Sunny | Partly Sunny | Cloudy | Rainy | Stormy",
        "weatherNote": "A very short explanation of her vibes for the husband.",
        "careGuide": "A secret tip for the husband (e.g., 'She needs silence, not solutions right now').",
        "mission": "String (the task) or null"
      }
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Hello. It's me, OMI. I'm here to listen to her heart and help them grow together." }] },
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    // 解析 JSON 并返回
    const data = JSON.parse(response.text());
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}