"use client";
import { useEffect, useState } from "react";
import { generateMedRec } from "./actions";
import { blobToBase64 } from "@/app/utils/blob-to-base-64";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function ChatRoom() {
  // Initialize the recorder controls using the hook
  const recorderControls = useVoiceVisualizer();
  const [voiceShouldStack, setVoiceShouldStack] = useState(false);
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
  } = recorderControls;

  const processAudio = async (audioBlob: Blob) => {
    try {
      const audioBlobBase64 = await blobToBase64(audioBlob);
      //   const response = await generateMedRec({
      //     audio: audioBlobBase64,
      //     prompts: [],
      //   });
      console.log(audioBlobBase64);
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;
    setTimeout(() => {
      setVoiceShouldStack(true);
    }, 500);
    processAudio(recordedBlob);
  }, [recordedBlob, error]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);
  return (
    <div className="relative px-2 h-screen overflow-auto">
      <Link
        href="/dashboard"
        className="absolute top-5 left-5 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
      >
        <ArrowLeftIcon className="w-6 h-6 text-primary" />
      </Link>
      <div
        className={cn(
          "w-full max-w-7xl bg-red-50 mx-auto min-h-screen transition-all relative duration-500"
        )}
      >
        <VoiceVisualizer
          controls={recorderControls}
          controlButtonsClassName={recordedBlob ? "hidden" : ""}
          mainBarColor="hsl(var(--primary))"
          mainContainerClassName={cn(
            "w-full will-change-transform transform duration-500",
            recordedBlob
              ? `${voiceShouldStack ? "unset" : "absolute"} top-0 translate-y-0`
              : "absolute -translate-y-1/2 top-1/2"
          )}
        />
      </div>
    </div>
  );
}
