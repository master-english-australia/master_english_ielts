import { RefObject } from "react";
import { createResizeHandler } from "./resizeHandler";

export const createResizeEventHandlers = (
  e: React.MouseEvent,
  layoutRef: RefObject<HTMLDivElement | null>,
  setContentWidth: (w: number) => void,
  setAnswerWidth: (w: number) => void,
) => {
  e.preventDefault();

  const handleMove = createResizeHandler({
    layoutRef,
    setWidths: (content, answer) => {
      setContentWidth(content);
      setAnswerWidth(answer);
    },
  });

  const handleUp = () => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
  };

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleUp);
};
