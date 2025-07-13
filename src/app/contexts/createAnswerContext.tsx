import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type AnswerState = Record<number, string>;

export type AnswerAction =
  | { type: "UPSERT"; questionNumber: number; value: string }
  | { type: "RESET" };

export const answerReducer = (
  state: AnswerState,
  action: AnswerAction,
): AnswerState => {
  switch (action.type) {
    case "UPSERT":
      return { ...state, [action.questionNumber]: action.value };
    case "RESET":
      return {};
    default:
      return state;
  }
};

export function createAnswerContext() {
  const Context = createContext<{
    state: AnswerState;
    dispatch: Dispatch<AnswerAction>;
  } | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(answerReducer, {});
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  const useAnswers = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useAnswers must be used within its Provider");
    }
    return context;
  };

  return { Provider, useAnswers };
}
