"use server";

import {
  Prompt,
  SyncronousTranscribeRequestData,
  TranscribeResponse,
} from "@/app/types";
import { exampleData } from "@/data/data";
import Groq from "groq-sdk";

export interface GenerateMedRecArgs {
  audio: string;
  prompts: Prompt[];
}

export async function generateMedRec(
  args: GenerateMedRecArgs
): Promise<TranscribeResponse> {
  const transcribeUrl = process.env.TRANSCRIBE_URL || "";
  const apiKey = process.env.TRANSCRIBE_API_KEY;
  if (!transcribeUrl || !apiKey) {
    throw new Error("Transcribe URL or API key not found");
  }
  const payload: SyncronousTranscribeRequestData = {
    config: {
      model: "stt-general",
      speaker_count: 2,
      wait: true, // Blocks the request until the execution is finished
    },
    request: {
      data: args.audio,
    },
  };

  const response = await fetch(transcribeUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export interface SummarizationRequestData {
  transcript: string[];
}

export async function draftSummarization(
  transcribes: Array<string>
): Promise<Array<string>> {
  const userMessage = transcribes.map((transcribe, index) => {
    return index + 1 + ". " + transcribe;
  }).join("\n");

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: " dalam bahasa indonesia, buatkanlah draft rekam medis/EHR dari transcript percakapan anamnesis dan tentukan juga kode ICD-10nya",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama3-8b-8192",
  })
  return result.choices[0]?.message?.content?.split("\n") || [];
}

export async function summarizeExampleTranscript() {
  const transcribes = exampleData.map((data) => "Speaker_" + data.speaker + ": " + data.message);
  return draftSummarization(transcribes);
}