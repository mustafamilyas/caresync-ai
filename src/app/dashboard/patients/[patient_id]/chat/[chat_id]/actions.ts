"use server";

export interface GenerateMedRecArgs {
  audio: string;
  prompts: string[];
}

export async function generateMedRec(
  args: GenerateMedRecArgs
): Promise<{ result: string }> {
  const transcribeUrl = process.env.TRANSCRIBE_URL || "";
  const apiKey = process.env.TRANSCRIBE_API_KEY;
  if (!transcribeUrl || !apiKey) {
    throw new Error("Transcribe URL or API key not found");
  }
  const payload = {
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
