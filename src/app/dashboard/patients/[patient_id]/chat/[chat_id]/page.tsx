"use client";
import { useEffect } from "react";
import { generateMedRec } from "./actions";
import { blobToBase64 } from "@/app/utils/blob-to-base-64";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

export default function ChatRoom() {
  // Initialize the recorder controls using the hook
  const recorderControls = useVoiceVisualizer();
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
  } = recorderControls;

  const processAudio = async (audioBlob: Blob) => {
    try {
      const audioBlobBase64 = await blobToBase64(audioBlob);
      const response = await generateMedRec({
        audio: audioBlobBase64,
        prompts: [],
      });
      console.log(response);
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    processAudio(recordedBlob);
  }, [recordedBlob, error]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);
  return <VoiceVisualizer controls={recorderControls} />;
}
