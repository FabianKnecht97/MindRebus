import { GoogleGenAI, Type } from "@google/genai";
import { RebusPuzzle, Difficulty, Category } from "../types";

// Helper to get today's date string for seeding if needed
const getTodayString = () => new Date().toISOString().split('T')[0];

export const generateRebusPuzzle = async (difficulty: Difficulty): Promise<RebusPuzzle | null> => {
  try {
    // Fix: Using direct initialization with process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Schema for structured output using Type from @google/genai
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        visualContent: {
          type: Type.STRING,
          description: "The visual text representation of the rebus. Use minimal HTML tags like <b>, <span class='text-red-500'>, <br> to style it if necessary for the puzzle mechanic. E.g. 'mil1lion' or '<b>Cycle</b>' (repeated). Content must be universally understood.",
        },
        answer: {
          type: Type.STRING,
          description: "The correct answer in English.",
        },
        explanation: {
          type: Type.STRING,
          description: "Explanation of why this is the answer.",
        },
        hint1: { type: Type.STRING, description: "A vague hint." },
        hint2: { type: Type.STRING, description: "A very clear hint." },
      },
      required: ["visualContent", "answer", "explanation", "hint1", "hint2"],
    };

    const prompt = `
      Create a unique, clever Rebus puzzle in English for a '${difficulty}' difficulty level.
      
      Examples of style:
      - 'mil1lion' -> Answer: One in a Million
      - 'tRoUble' -> Answer: You are in trouble
      - 'P P P P' -> Answer: Large Peas (or similar wordplay)
      - 'D' inside 'Light' -> Answer: Delight
      - 'Na' written 4 times -> Answer: Nana Mouskouri or similar wordplay.
      
      Ensure the answer is a common English phrase, compound word, or idiom.
      The visualContent should be the puzzle itself.
    `;

    // Always use ai.models.generateContent with the latest recommended model
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Complex creative task
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    // Directly access .text property
    if (response.text) {
      const data = JSON.parse(response.text.trim());
      
      return {
        id: `gen_${Date.now()}`,
        visualContent: data.visualContent,
        answer: data.answer,
        acceptedSynonyms: [],
        difficulty: difficulty,
        category: Category.GENERAL,
        hint1: data.hint1,
        hint2: data.hint2,
        explanation: data.explanation,
        xpReward: difficulty === Difficulty.EASY ? 10 : difficulty === Difficulty.MEDIUM ? 25 : 50,
      };
    }
    return null;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return null;
  }
};

export const getGeminiHint = async (puzzle: RebusPuzzle, currentInput: string): Promise<string> => {
  try {
    // Fix: Using direct initialization with process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      The user is trying to solve this English Rebus puzzle:
      Visual: ${puzzle.visualContent}
      Answer: ${puzzle.answer}
      
      The user guessed: "${currentInput}".
      
      Give a subtle, helpful nudge in English without revealing the answer. Max 1 sentence.
    `;

    // Always use ai.models.generateContent with the latest recommended model
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Basic Q&A task
      contents: prompt,
    });

    // Directly access .text property (not a method call)
    return response.text?.trim() || "Think outside the box!";
  } catch (e) {
    return "Look closely at the position of the letters.";
  }
}