// src/lib/ai/agent.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

// Interface for structured AI response
interface HusbandBriefing {
  brief: string;
  suggestion: string;
}

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

export const generateHusbandBriefing = async (
  productName: string,
  researchData: string[] // Past search queries or topics
): Promise<HusbandBriefing> => {
  const parser = new JsonOutputParser<HusbandBriefing>();

  const template = PromptTemplate.fromTemplate(`
    You are a professional Family Assistant. 
    The pregnant wife is researching: {research_data}.
    She just added this to her wishlist: {product_name}.

    Tasks for the husband:
    1. Context: Explain WHY she is interested in this item based on her research in one warm sentence.
    2. Action: Provide one specific, caring, and task-oriented suggestion for the husband.
    
    Output Format: JSON only with keys "brief" and "suggestion".
  `);

  const chain = template.pipe(model).pipe(parser);

  try {
    return await chain.invoke({
      research_data: researchData.join(", "),
      product_name: productName,
    });
  } catch (error) {
    console.error("AI Agent Error:", error);
    return {
      brief: "She's preparing for the baby's arrival.",
      suggestion: "Take a moment to ask her how she's feeling and review the wishlist together."
    };
  }
};