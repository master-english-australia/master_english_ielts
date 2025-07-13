import { createAnswerContext } from "../../../contexts/createAnswerContext";

const { Provider: ReadingAnswerProvider, useAnswers: useReadingAnswers } =
  createAnswerContext();

export { ReadingAnswerProvider, useReadingAnswers };
