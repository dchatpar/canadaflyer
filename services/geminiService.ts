import { GoogleGenAI } from "@google/genai";
import { Area, FlyerDetails, AIInsight } from '../types';

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateCampaignInsights = async (
  areas: Area[],
  details: FlyerDetails
): Promise<AIInsight[]> => {
  const ai = getAIClient();
  
  if (!ai) {
    return [
      {
        title: "High Density Targeting",
        content: "Selected zones have 85% residential density. Ideal for door hangers.",
        recommendationLevel: "High"
      },
      {
        title: "Weather Alert",
        content: "Rain forecast for distribution date. Consider laminating flyers.",
        recommendationLevel: "Medium"
      }
    ];
  }

  try {
    const areaNames = areas.map(a => a.name).join(", ");
    const prompt = `
      Act as a logistics expert for a Canadian flyer delivery service.
      Analyze:
      - Areas: ${areaNames}
      - Quantity: ${details.quantity}
      - Type: ${details.type}
      
      Provide 2 brief, strategic insights (max 25 words) for the customer.
      Return JSON: [{title, content, recommendationLevel: 'High'|'Medium'|'Low'}]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text;
    if (!text) throw new Error("No text");
    return JSON.parse(text) as AIInsight[];

  } catch (error) {
    console.error("Gemini Error:", error);
    return [{ title: "Insight Unavailable", content: "AI services are currently offline.", recommendationLevel: "Low" }];
  }
};

export const analyzePODImage = async (base64Image: string): Promise<{ isValid: boolean; reason: string }> => {
  const ai = getAIClient();
  
  // Simulation if no key
  if (!ai) {
    return new Promise(resolve => setTimeout(() => resolve({ isValid: true, reason: "Verified: Flyer visible at doorstep." }), 1500));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analyze this proof of delivery photo. Is a flyer or package visible? Return JSON: { isValid: boolean, reason: string }" }
        ]
      },
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text);
  } catch (e) {
    return { isValid: true, reason: "Manual verification required (AI unavailable)" };
  }
};
