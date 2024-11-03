"use server";

import {
  Prompt,
  SyncronousTranscribeRequestData,
  TranscribeResponse,
} from "@/app/types";
import Groq from "groq-sdk";
import fs from "fs";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

export interface GenerateMedRecArgs {
  audio: string;
  prompts: Prompt[];
}

export async function generateDraftMedRec(
  args: GenerateMedRecArgs
): Promise<Array<string>> {
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

  const transcript = (await response.json()) as TranscribeResponse;

  console.log(transcript.result.data)

  return draftSummarization(
    transcript.result.data
      .sort((a, b) => a.time_start - b.time_start)
      .map(
        (transcript) =>
          "Speaker " + transcript.speaker_tag + ": " + transcript.transcript
      )
  );
}

export async function speechToTextGroq(audio: Blob): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const file = new File([audio], "audio.wav", { type: "audio/wav" });
  const transcription = await groq.audio.transcriptions.create({
    file: file, // Required path to audio file - replace with your audio file!
    model: "whisper-large-v3-turbo", // Required model to use for transcription
    prompt: "Specify context or spelling", // Optional
    response_format: "json", // Optional
    language: "en", // Optional
    temperature: 0.0, // Optional
  });
  return transcription.text
}


export async function generateDraftMedRecGroq(
  blob: Blob
): Promise<Array<string>> {
  const result = await speechToTextGroq(blob);
  console.log(result);
  return draftSummarization(
    [result]
  );
}

export interface SummarizationRequestData {
  transcript: string[];
}

export async function draftSummarization(
  transcribes: Array<string>
): Promise<Array<string>> {
  const userMessage = transcribes
    .map((transcribe, index) => {
      return index + 1 + ". " + transcribe;
    })
    .join("\n");

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarize a dialogue transcript to a draft of medical record/EHR. You will give the draft in Indonesian language/bahasa indonesia and determine the ICD 10.",
      },
      {
        role: "user",
        content:
          "Given this dialogue\n" +
          userMessage +
          "\n\nMake me the draft of the patient medical record/EHR in Indonesian language/bahasa indonesia and determine the ICD 10.",
      },
    ],
    model: "llama-3.2-11b-vision-preview",
  });
  return result.choices[0]?.message?.content?.split("\n") || [];
}

export async function refineSummarization(prompts: Prompt[]) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarize a dialogue transcript to a draft of medical record/EHR. You will give the draft in Indonesian language/bahasa indonesia and determine the ICD 10.",
      },
      ...prompts.map(
        (prompt) =>
          ({
            role: prompt.sender === "bot" ? "assistant" : "user",
            content: prompt.content,
          } as ChatCompletionMessageParam)
      ),
    ],
    model: "llama-3.2-11b-vision-preview",
  });
  return result.choices[0]?.message?.content?.split("\n") || [];
}
