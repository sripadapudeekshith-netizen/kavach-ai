
import { GoogleGenAI, Type } from "@google/genai";
import { Language, DetectionResult, VoiceDetectionResponse, HoneypotRequest, HoneypotResponse } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVoice = async (
  language: Language, 
  base64Audio: string
): Promise<VoiceDetectionResponse> => {
  const ai = getAI();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'audio/mp3', data: base64Audio } },
        {
          text: `Conduct a Gov-grade Forensic Voice Analysis. 
          Target Language: ${language}.
          Detect: AI_GENERATED or HUMAN.
          
          Analyze micro-signals:
          1. Pitch variation randomness (jitter).
          2. Breath gap consistency (synthetic voices often lack natural pauses).
          3. Neural vocoder artifacts (high-frequency spectral patterns).
          
          Format the output strictly as JSON including:
          - classification (AI_GENERATED/HUMAN)
          - confidence (0-1)
          - explanation (detailed reason)
          - languageDetected
          - signals: { pitchVariation, breathRandomness, spectralFlatness, neuralArtifacts } (all 0-1)
          - anomaliesTimeline: Array of { time, event }`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING, enum: [DetectionResult.AI_GENERATED, DetectionResult.HUMAN] },
          confidence: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          languageDetected: { type: Type.STRING },
          signals: {
            type: Type.OBJECT,
            properties: {
              pitchVariation: { type: Type.NUMBER },
              breathRandomness: { type: Type.NUMBER },
              spectralFlatness: { type: Type.NUMBER },
              neuralArtifacts: { type: Type.NUMBER }
            }
          },
          anomaliesTimeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                event: { type: Type.STRING }
              }
            }
          }
        },
        required: ["classification", "confidence", "explanation", "languageDetected", "signals"]
      }
    }
  });

  return { ...JSON.parse(response.text || "{}"), status: 'success' };
};

export const getHoneypotReply = async (request: HoneypotRequest): Promise<HoneypotResponse> => {
  const ai = getAI();
  const historyText = request.conversationHistory.map(m => `${m.sender}: ${m.text}`).join("\n");

  const prompt = `
    Role: KAVACH Honeypot Agent.
    Context: Engaging a scammer to extract intelligence.
    Persona: Human-like, slightly confused but interested, realistic hesitation.
    Rules: Do not repeat sentences. Adapt tone. extract intelligence.
    
    Conversation History:
    ${historyText}
    
    New Scammer Message:
    "${request.message.text}"
    
    Return JSON:
    - reply: The natural response string.
    - detectedIntelligence: { bankAccounts, upiIds, phishingLinks, phoneNumbers, suspiciousKeywords }
    - strategyUsed: (e.g., "Verification Probing", "Passive Listening")
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 24576 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING },
          strategyUsed: { type: Type.STRING },
          detectedIntelligence: {
            type: Type.OBJECT,
            properties: {
              bankAccounts: { type: Type.ARRAY, items: { type: Type.STRING } },
              upiIds: { type: Type.ARRAY, items: { type: Type.STRING } },
              phishingLinks: { type: Type.ARRAY, items: { type: Type.STRING } },
              phoneNumbers: { type: Type.ARRAY, items: { type: Type.STRING } },
              suspiciousKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });

  return { ...JSON.parse(response.text || "{}"), status: 'success' };
};

export const assistantQuery = async (message: string, image?: { data: string, mimeType: string }) => {
  const ai = getAI();
  const parts: any[] = [{ text: message }];
  if (image) parts.push({ inlineData: { data: image.data, mimeType: image.mimeType } });

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts },
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      systemInstruction: "You are KAVACH Intelligence Core. Provide elite cybersecurity analysis."
    }
  });
  return response.text;
};
