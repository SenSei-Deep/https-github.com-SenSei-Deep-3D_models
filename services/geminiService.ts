
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Note: Always use process.env.API_KEY directly for initialization as per guidelines.
// GoogleGenAI instance should ideally be created right before use if the key can change.

export const getAIProductInsights = async (product: Product) => {
  // Fixed: Use process.env.API_KEY exclusively and directly for client initialization.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a luxurious, 2-sentence sales pitch for a home decor item named "${product.name}" in the "${product.category}" category. The description is: ${product.description}.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Fixed: Extract generated text directly from the .text property (not a method).
    return response.text || "Elevate your space with this exquisite piece from Aura Home.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This piece is crafted for those who appreciate fine details and timeless design.";
  }
};
