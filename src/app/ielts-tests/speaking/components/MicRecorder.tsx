import MicIcon from "@mui/icons-material/Mic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";

interface MicRecorderProps {
  isSubmitted: boolean;
  onAudioRecorded?: (audioURL: string | null) => void;
  onAudioBlobReady?: (blob: Blob | null) => void;
}

export const MicRecorder = ({
  isSubmitted,
  onAudioRecorded,
  onAudioBlobReady,
}: MicRecorderProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const autoStopTimerRef = useRef<number | null>(null);
  const MAX_RECORDING_MS = 20 * 60 * 1000;

  const clearAutoStopTimer = () => {
    if (autoStopTimerRef.current != null) {
      window.clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
  };

  const pickMime = () => {
    if (typeof MediaRecorder === "undefined") return null;
    if (MediaRecorder.isTypeSupported?.("audio/webm")) return "audio/webm";
    if (MediaRecorder.isTypeSupported?.("audio/mp4")) return "audio/mp4";
    if (MediaRecorder.isTypeSupported?.("audio/aac")) return "audio/aac";
    return "";
  };

  const startRecording = async () => {
    setError(null);
    if (busy || recording) return;
    setBusy(true);
    try {
      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices?.getUserMedia
      ) {
        throw new Error("This browser does not support recording.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickMime();
      if (mimeType === null)
        throw new Error("This browser does not support recording.");

      const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        clearAutoStopTimer();
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });
        chunksRef.current = [];
        const url = URL.createObjectURL(blob);

        if (audioURL) URL.revokeObjectURL(audioURL);
        setAudioURL(url);
        setRecording(false);

        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        onAudioRecorded?.(url);
        onAudioBlobReady?.(blob);
      };

      mr.start(1000);
      setRecording(true);
      clearAutoStopTimer();
      autoStopTimerRef.current = window.setTimeout(() => {
        try {
          const currentMr = mediaRecorderRef.current;
          if (currentMr && currentMr.state !== "inactive") {
            currentMr.stop();
          }
          if (!isSubmitted) {
            setError("Maximum recording time of 20 minutes reached.");
          }
        } catch {}
      }, MAX_RECORDING_MS);
    } catch (e: any) {
      setError(e?.message || "Microphone access is not allowed.");
      setRecording(false);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    } finally {
      setBusy(false);
    }
  };

  const stopRecording = () => {
    const mr = mediaRecorderRef.current;
    if (mr && recording && mr.state !== "inactive") {
      clearAutoStopTimer();
      mr.stop();
    }
  };

  useEffect(() => {
    if (isSubmitted && recording) stopRecording();
  }, [isSubmitted]);

  useEffect(() => {
    return () => {
      try {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }
      } catch {}
      streamRef.current?.getTracks().forEach((t) => t.stop());
      clearAutoStopTimer();
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Button
        variant={recording ? "contained" : "outlined"}
        color={recording ? "error" : "primary"}
        onClick={recording ? stopRecording : startRecording}
        disabled={isSubmitted || busy}
        sx={{
          mt: 2,
          width: 64,
          height: 64,
          minWidth: 0,
          minHeight: 0,
          borderRadius: "50%",
          p: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: recording ? 4 : 1,
          fontSize: 32,
        }}
      >
        <MicIcon
          sx={{ fontSize: 36, color: recording ? "white" : "inherit" }}
        />
      </Button>
      {audioURL && <audio controls src={audioURL} style={{ marginTop: 12 }} />}
      {error && <Box sx={{ color: "red", mt: 1 }}>{error}</Box>}
    </Box>
  );
};
