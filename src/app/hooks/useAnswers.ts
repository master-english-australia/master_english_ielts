import { useMemo } from "react";
import { Answer } from "../models/Answer";
import { IeltsSection } from "../models/IeltsTest";
import { useStorageJson } from "./useStorageJson";

interface UseAnswersOptions {
  part: IeltsSection;
  id: string;
  isAcademic?: boolean;
}

export function useAnswers({
  part,
  id,
  isAcademic,
}: UseAnswersOptions): Answer[] {
  const path = useMemo(
    () => `${part}/${isAcademic ? "academic/" : ""}${id}/answers.json`,
    [part, id, isAcademic],
  );
  const state = useStorageJson<Record<string, string[]>>(
    "ielts-tests",
    () => path,
  );

  const answers = useMemo<Answer[]>(() => {
    if (!state.data) return [];
    return Object.entries(state.data)
      .map(([numStr, values]) => ({
        number: Number(numStr),
        answers: values,
      }))
      .sort((a, b) => a.number - b.number);
  }, [state.data]);

  return answers;
}
