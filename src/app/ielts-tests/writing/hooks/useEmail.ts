import { sendEmail } from "@/lib/api";
import { useState } from "react";

interface UseEmailState {
  error: string | null;
  data: any | null;
}

interface UseEmailReturn extends UseEmailState {
  sendEmailAsync: (
    part1Essay: string,
    part2Essay: string,
    part1Prompt: string,
    part2Prompt: string,
    testId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
  ) => Promise<boolean>;
  reset: () => void;
}

export function useEmail(): UseEmailReturn {
  const [state, setState] = useState<UseEmailState>({
    error: null,
    data: null,
  });

  const createMessage = (
    part1Prompt: string,
    part1Essay: string,
    part2Prompt: string,
    part2Essay: string,
    testId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
  ) => {
    return `Writing test has been submitted.<br>
      <strong>Test ID:</strong> ${testId}<br>
      <strong>User Name:</strong> ${userName}<br>
      <strong>Email:</strong> ${userEmail}<br>
      <strong>Phone:</strong> ${userPhone}<br>
      
      <h3>=== Part 1 ===</h3>
      <strong>Question:</strong>
      <br>
      ${part1Prompt}
      <br>
      <strong>Answer:</strong>
      <br>
      ${part1Essay.replace(/\n/g, "<br>")}<br><br>
      
      <h3>=== Part 2 ===</h3><br>
      <strong>Question:</strong>
      <br>
      ${part2Prompt}
      <br>
      <strong>Answer:</strong>
      <br>
      ${part2Essay.replace(/\n/g, "<br>")}
    `;
  };

  const sendEmailAsync = async (
    part1Essay: string,
    part2Essay: string,
    part1Prompt: string,
    part2Prompt: string,
    testId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
  ): Promise<boolean> => {
    const payload = {
      name: userName,
      subject: "IELTS Writing Test Submission " + userName + testId,
      message: createMessage(
        part1Prompt,
        part1Essay,
        part2Prompt,
        part2Essay,
        testId,
        userName,
        userEmail,
        userPhone,
      ),
    };

    setState({ error: null, data: null });

    try {
      const result = await sendEmail(payload);
      setState({ error: null, data: result });
      return true;
    } catch (error) {
      setState({
        error: error instanceof Error ? error.message : "Failed to send email",
        data: null,
      });
      return false;
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
