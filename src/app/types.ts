export interface Prompt {
  id: string;
  sender: "user" | "bot";
  content: string;
}

export enum AudioProcessingStatus {
  Waiting = "Waiting for audio input...",
  Recording = "Recording audio...",
  Processing = "Audio input received. Processing...",
  Success = "Audio processed successfully.",
  Error = "Error processing audio. Please try again.",
}

export enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}
