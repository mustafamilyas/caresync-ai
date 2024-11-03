"use client";
import { useEffect, useState } from "react";
import { generateMedRec } from "./actions";
import { blobToBase64 } from "@/app/utils/blob-to-base-64";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonalIcon, SendHorizontalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Prompt } from "@/app/types";

const dummyPrompts: Prompt[] = [
  {
    id: "1",
    content: "What brings you here today?",
    sender: "bot",
  },
  {
    id: "2",
    content: "How are you feeling?",
    sender: "user",
  },
  {
    id: "3",
    content: "What are your symptoms?",
    sender: "bot",
  },
  {
    id: "4",
    content: "How long have you been feeling this way?",
    sender: "user",
  },
];

export default function ChatRoom() {
  const [prompts, setPrompts] = useState<Prompt[]>(dummyPrompts);
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
        className="fixed z-10 top-5 left-5 p-2 rounded-full bg-primary-foreground shadow-lg hover:bg-muted"
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
        {voiceShouldStack
          ? prompts.map((prompt, index) => (
              <div
                key={index}
                className="p-2 bg-white border border-input rounded-lg my-2"
              >
                <p>{prompt.content}</p>
              </div>
            ))
          : null}
      </div>
      <form
        className={cn(
          "fixed left-1/2 bottom-5 -translate-x-1/2 w-full max-w-7xl flex items-center justify-between p-2 bg-white border border-input gap-2",
          "transition-transform duration-500",
          recordedBlob ? "translate-y-0" : "translate-y-40"
        )}
      >
        <Textarea
          placeholder="Send your message here"
          className="flex-grow h-3 resize-none"
          rows={1}
        />
        <Button type="submit">
          <SendHorizontalIcon />
        </Button>
      </form>
    </div>
  );
}
