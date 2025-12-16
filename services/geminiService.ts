import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION, FIDELITY_SYSTEM_INSTRUCTION, COGNITIVE_ANALYST_SYSTEM_INSTRUCTION, POLYMATH_SYSTEM_INSTRUCTION } from "../constants";
import { EigenResponse, FidelityResponse, CognitiveResponse, PolymathResponse } from "../types";

export const generateBridge = async (domainA: string, domainB: string): Promise<EigenResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Perform a Structural Isomorphism Analysis between:
Domain A: "${domainA}"
Domain B: "${domainB}"

STRICT SCORING ENFORCEMENT:
- If domains are in the same field (e.g., Coding Languages, Sports, Food), Score MUST be < 0.4.
- If domains are distinct but share a generic link, Score 0.4 - 0.7.
- Only award > 0.9 if the domains are completely unrelated on the surface but share a precise mathematical or logical geometry.

Return the JSON response adhering to the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bridgeTitle: { type: Type.STRING },
            resonanceScore: { type: Type.NUMBER },
            mechanism: { type: Type.STRING },
            explanation: { type: Type.STRING },
            domainAConcepts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            domainBConcepts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            sharedConcepts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
          },
          required: ["bridgeTitle", "resonanceScore", "mechanism", "explanation", "domainAConcepts", "domainBConcepts", "sharedConcepts"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as EigenResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to calculate Eigen Bridge. The Architect is silent.");
  }
};

export const evaluateFidelity = async (question: string): Promise<FidelityResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Evaluate the Signaling Fidelity of this user input: "${question}"`,
      config: {
        systemInstruction: FIDELITY_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fidelity_score: { type: Type.NUMBER },
            classification: { type: Type.STRING, enum: ["CHEAP", "MIMICRY", "SIGNAL"] },
            critique: { type: Type.STRING },
          },
          required: ["fidelity_score", "classification", "critique"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as FidelityResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The Gatekeeper cannot evaluate this signal.");
  }
};

export const generateCognitiveAnalysis = async (topicA: string, topicB: string): Promise<CognitiveResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the Psychological Shared Trait between:
Topic A: "${topicA}"
Topic B: "${topicB}"`,
      config: {
        systemInstruction: COGNITIVE_ANALYST_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            match_strength: { type: Type.NUMBER },
            shared_trait: { type: Type.STRING },
            icebreaker: { type: Type.STRING },
            analysis: { type: Type.STRING },
          },
          required: ["match_strength", "shared_trait", "icebreaker", "analysis"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as CognitiveResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The Cognitive Analyst failed to link these minds.");
  }
};

export const generatePolymathProfile = async (portfolioA: string, portfolioB: string): Promise<PolymathResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze these two interest portfolios:
User A's Portfolio: "${portfolioA}"
User B's Portfolio: "${portfolioB}"`,
      config: {
        systemInstruction: POLYMATH_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            user_a_archetype: { type: Type.STRING },
            user_b_archetype: { type: Type.STRING },
            shared_archetype: { type: Type.STRING },
            match_score: { type: Type.NUMBER },
            insight: { type: Type.STRING },
            icebreaker: { type: Type.STRING },
          },
          required: ["user_a_archetype", "user_b_archetype", "shared_archetype", "match_score", "insight", "icebreaker"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as PolymathResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The Polymath Profiler could not synthesize these personas.");
  }
};
