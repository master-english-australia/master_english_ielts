import { useMemo } from "react";
import { IeltsSection } from "../models/IeltsTest";
import { Question } from "../models/Question";
import { QuestionGroup } from "../models/QuestionGroup";
import { QuestionPart } from "../models/QuestionPart";
import { useStorageJson } from "./useStorageJson";

type StorageQuestion = Omit<Question, "correctAnswer"> & {
  correctAnswer?: string;
};
type StorageQuestionGroup = Omit<QuestionGroup, "questions"> & {
  questions: StorageQuestion[];
};
type StorageQuestionPart = Omit<QuestionPart, "question_groups"> & {
  question_groups: StorageQuestionGroup[];
};

export interface IeltsReadingTestContent {
  test_id: string;
  title: string;
  parts: StorageQuestionPart[];
}

interface UseTestDetailOptions {
  part: IeltsSection;
  id: string;
}

interface UseTestDetailState<TData>
  extends ReturnType<typeof useStorageJson<TData>> {}

export function useTestDetail({
  part,
  id,
}: UseTestDetailOptions): UseTestDetailState<IeltsReadingTestContent> {
  const path = useMemo(() => `${part}/${id}/questions.json`, [part, id]);
  const state = useStorageJson<IeltsReadingTestContent>(
    "ielts-tests",
    () => path,
  );
  return state as UseTestDetailState<IeltsReadingTestContent>;
}
