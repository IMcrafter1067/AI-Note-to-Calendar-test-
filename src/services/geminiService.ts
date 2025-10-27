import { GoogleGenAI, Type } from "@google/genai";
import type { CalendarEvent } from '../types';

const eventSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise title for the event."
    },
    date: {
      type: Type.STRING,
      description: "The date of the event in 'Month Day, Year' format (e.g., 'July 26, 2024')."
    },
    time: {
      type: Type.STRING,
      description: "The time of the event in 'HH:MM AM/PM' format (e.g., '10:30 AM'). If no specific time is mentioned, return 'All-day'."
    }
  },
  required: ['title', 'date', 'time'],
};

export async function extractEventDetails(note: string): Promise<CalendarEvent> {
  // Fix: Per coding guidelines, assume API_KEY is always available in the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following note into a calendar event. Today is ${new Date().toDateString()}. Note: "${note}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: eventSchema,
      },
    });

    // Fix: Trim whitespace from the response before parsing, as recommended by the guidelines.
    const parsedJson = JSON.parse(response.text.trim());
    
    return {
        ...parsedJson,
        rawText: note,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not parse event details from the note.");
  }
}
