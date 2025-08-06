import { sendEmail, SendEmailPayload } from "@/lib/api";
import { useState } from "react";

interface UseEmailState {
  error: string | null;
  data: any | null;
}

interface UseEmailReturn extends UseEmailState {
  sendEmailAsync: (payload: SendEmailPayload) => Promise<void>;
  reset: () => void;
}

export function useEmail(): UseEmailReturn {
  const [state, setState] = useState<UseEmailState>({
    error: null,
    data: null,
  });

  const sendEmailAsync = async (payload: SendEmailPayload) => {
    setState({
      error: null,
      data: null,
    });

    try {
      const result = await sendEmail(payload);
      setState({
        error: null,
        data: result,
      });
    } catch (error) {
      setState({
        error: error instanceof Error ? error.message : "Failed to send email",
        data: null,
      });
    }
  };

  const reset = () => {
    setState({
      error: null,
      data: null,
    });
  };

  return {
    ...state,
    sendEmailAsync,
    reset,
  };
}
