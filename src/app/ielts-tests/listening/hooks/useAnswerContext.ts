import { createAnswerContext } from "../../../contexts/createAnswerContext";

const { Provider: ListeningAnswerProvider, useAnswers: useListeningAnswers } =
  createAnswerContext();

export { ListeningAnswerProvider, useListeningAnswers };
