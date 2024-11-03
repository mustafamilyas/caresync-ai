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

export interface SyncronousTranscribeRequestData {
  config: {
    model: string;
    speaker_count: number;
    wait: boolean; // Blocks the request until the execution is finished if true
  };
  request: {
    data: string;
  };
}

export interface Transcribe {
  transcript: string;
  final: boolean;
  time_start: number;
  time_end: number;
  channel: number;
  speaker_tag: number;
}

export interface TranscribeResponse {
  job_id: string; // "uid"
  status: string; // "complete";
  created_at: string; // "2024-11-03T06:21:44.716000"
  modified_at: string; // "2024-11-03T06:21:46.047735";
  request: {
    label: string | null;
    uri: string | null;
    data: null;
    duration: number; // 2.0;
    mime_type: string; // "video/webm";
    sample_rate: number;
    channels: number;
  };
  result: {
    data: Array<Transcribe>;
    path: null;
    error: null;
    latency: number; //1.3314322093501687;
    speaker_count: number; // 2;
    speech_insights: null;
    voice_insights: null;
  };
  job_config: {
    model: string;
    wait: boolean;
    include_filler: boolean;
    include_partial_results: boolean;
    auto_punctuation: boolean;
    enable_spoken_numerals: boolean;
    speaker_count: number;
    enable_speech_insights: boolean;
    enable_voice_insights: boolean;
  };
  progress: null;
  model: {
    name: string;
    label: string;
    language: string;
    domain: string;
    acoustic: string;
    samplerate: number;
  };
}
