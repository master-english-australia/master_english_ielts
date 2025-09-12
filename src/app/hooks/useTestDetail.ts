import { useMemo } from "react";
import { IeltsSection } from "../models/IeltsTest";
import { Question } from "../models/Question";
import { QuestionGroup } from "../models/QuestionGroup";
import { QuestionPart } from "../models/QuestionPart";
import { useStorageJson } from "./useStorageJson";

export interface WritingTestContent {
  part1: { promptContent: string; imageUrl?: string };
  part2: { promptContent: string; imageUrl?: string };
}

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

// Overloads for strong typing by section
export function useTestDetail(options: {
  part: "writing";
  id: string;
}): UseTestDetailState<WritingTestContent>;
export function useTestDetail(options: {
  part: "reading" | "listening" | "speaking";
  id: string;
}): UseTestDetailState<IeltsReadingTestContent>;
export function useTestDetail({
  part,
  id,
}: UseTestDetailOptions): UseTestDetailState<any> {
  const path = useMemo(() => `${part}/${id}/questions.json`, [part, id]);
  if (part === "writing") {
    return useStorageJson<WritingTestContent>(
      "ielts-tests",
      () => path,
    ) as UseTestDetailState<WritingTestContent>;
  }
  return useStorageJson<IeltsReadingTestContent>(
    "ielts-tests",
    () => path,
  ) as UseTestDetailState<IeltsReadingTestContent>;
}
