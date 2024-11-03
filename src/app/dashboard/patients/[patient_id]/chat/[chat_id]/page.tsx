"use client";
import { useCallback, useEffect, useState } from "react";
import { generateDraftMedRec, refineSummarization } from "./actions";
import { blobToBase64 } from "@/app/utils/blob-to-base-64";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Prompt } from "@/app/types";
import ReactMarkdown from "react-markdown";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

const dummyPrompts: Prompt[] = [
  {
    id: "1",
    content: "Hello, how can I help you today?",
    sender: "bot",
  },
  {
    id: "2",
    content: "I'm feeling unwell",
    sender: "user",
  },
  {
    id: "3",
    content: "Can you describe your symptoms?",
    sender: "bot",
  },
];

export default function ChatRoom() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [prompts, setPrompts] = useState<Prompt[]>(dummyPrompts);
  const { pending } = useFormStatus();
  // Initialize the recorder controls using the hook
  const recorderControls = useVoiceVisualizer();
  const [voiceShouldStack, setVoiceShouldStack] = useState(false);
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
  } = recorderControls;

  const addPrompt = useCallback(
    (prompt: Prompt) => {
      setPrompts((prevPrompts) => [...prevPrompts, prompt]);
    },
    [setPrompts]
  );

  const submitMessage = useCallback(
    async (data) => {
      try {
        const nextPrompt: Prompt = {
          id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
          content: data.message,
          sender: "user",
        };
        setValue("message", "");
        addPrompt(nextPrompt);
        const response = await refineSummarization([...prompts, nextPrompt]);
        addPrompt({
          id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
          content: response.join("\n"),
          sender: "bot",
        });
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
    [addPrompt, prompts, setValue]
  );

  const processAudio = useCallback(
    async (audioBlob: Blob) => {
      try {
        const audioBlobBase64 = await blobToBase64(audioBlob);
        const response = await generateDraftMedRec({
          audio: audioBlobBase64,
          prompts: [],
        });
        addPrompt({
          id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
          content: response.join("\n"),
          sender: "bot",
        });
      } catch (error) {
        console.error("Error processing audio:", error);
      }
    },
    [addPrompt]
  );

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;
    setTimeout(() => {
      setVoiceShouldStack(true);
    }, 500);
    processAudio(recordedBlob);
  }, [recordedBlob, processAudio]);

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
          "w-full max-w-7xl  mx-auto min-h-screen transition-all relative duration-500"
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
                className={cn(
                  "my-2 w-fit max-w-[90%]",
                  prompt.sender === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                <span>{prompt.sender === "bot" ? "Bot" : "You"} says:</span>
                <div
                  className={cn("p-2 bg-primary-foreground rounded-lg mt-2")}
                >
                  <ReactMarkdown>{prompt.content}</ReactMarkdown>
                </div>
              </div>
            ))
          : null}
        {pending ? <div>Processing...</div> : null}
      </div>
      <form
        className={cn(
          "fixed left-1/2 bottom-5 -translate-x-1/2 max-w-7xl w-4/6 flex items-center justify-between p-2 bg-white border border-input gap-2",
          "transition-transform duration-500",
          recordedBlob ? "translate-y-0" : "translate-y-40"
        )}
        onSubmit={handleSubmit(submitMessage)}
      >
        <Textarea
          placeholder="Send your message here"
          className="flex-grow h-3 resize-none"
          rows={1}
          {...register("message")}
        />
        <Button type="submit">
          <SendHorizontalIcon />
        </Button>
      </form>
    </div>
  );
}
