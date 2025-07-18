import { QuestionGroup } from "./QuestionGroup";

export interface QuestionPart {
  id: string;
  title: string;
  content_html: string;
  instruction: string;
  audio_url?: string;
  question_groups: QuestionGroup[];
}
