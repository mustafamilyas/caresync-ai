"use client";
import { useState, useRef } from "react";
import { generateMedRec, summarizeExampleTranscript } from "./actions";
import ReactMarkdown from 'react-markdown';
import { blobToBase64 } from "@/app/utils/blob-to-base-64";
import { exampleData } from "@/data/data";

export default function ChatRoom() {
  const [status, setStatus] = useState("Waiting for audio input...");
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [summary, setSummary] = useState<string[] | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const data = exampleData;

  const processSummarization = async () => {
    setSummary(await summarizeExampleTranscript());
  }

  const processAudio = async (audioBlob: Blob) => {
    try {
      setStatus("Audio input received. Processing...");
      const audioBlobBase64 = await blobToBase64(audioBlob);
      const response = await generateMedRec({
        audio: audioBlobBase64,
        prompts: [],
      });
      console.log(response);
      setStatus("Audio processed successfully.");
    } catch (error) {
      console.error("Error processing audio:", error);
      setStatus("Error processing audio. Please try again.");
    }
  };

  const startRecording = async () => {
    try {
      setStatus("Recording audio...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);

        setAudioUrl(url);
        processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setStatus(
        "Error accessing microphone. Please check your browser settings."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  return (
    <div>
      <h1>Microphone Recorder</h1>
      <button
        onClick={startRecording}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Recording
      </button>
      <button
        onClick={stopRecording}
        disabled={!isRecording}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop Recording
      </button>
      {audioUrl ? (
        <audio id="audioPlayback" controls src={audioUrl}></audio>
      ) : null}
      <div>{status}</div>
      <h2>Transcript</h2>
      <div>
        {
          data?.map((transcript, index) => <div key={index}>
              {"Speaker " + transcript.speaker + ": " + transcript.message}
              {/* {"Start: " + transcript.time_start.toFixed(2) + " | " + "End: " + transcript.time_end.toFixed(2)} */}
            </div>)
        }
      </div>

      <button
        onClick={processSummarization}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        process transcript summarization
      </button>
      <div>
        {
          summary?.map((summary, index) => <ReactMarkdown key={index}>{summary}</ReactMarkdown>)
        }
      </div>
    </div>
  );
}
