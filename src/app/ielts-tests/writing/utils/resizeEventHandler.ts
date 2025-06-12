import { RefObject } from "react";
import { createResizeHandler } from "./resizeHandler";

interface ResizeEventHandlers {
  setContentWidth: (width: number) => void;
  setAnswerWidth: (width: number) => void;
  setIsResizing: (isResizing: boolean) => void;
}

export const createResizeEventHandlers = (
  e: React.MouseEvent,
  layoutRef: RefObject<HTMLDivElement | null>,
  contentWidth: number,
  answerWidth: number,
  handlers: ResizeEventHandlers,
  contentId: string,
  answerId: string,
) => {
  e.preventDefault();
  handlers.setIsResizing(true);

  const contentElement = document.getElementById(contentId);
  const answerElement = document.getElementById(answerId);
  const resizeHandle = document.querySelector(".resize-handle");

  let lastContentWidth = contentWidth;
  let lastAnswerWidth = answerWidth;

  const handleMove = createResizeHandler(
    layoutRef,
    { contentElement, answerElement, resizeHandle },
    { lastContentWidth, lastAnswerWidth },
  );

  const handleUp = () => {
    handlers.setContentWidth(lastContentWidth);
    handlers.setAnswerWidth(lastAnswerWidth);
    handlers.setIsResizing(false);

    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
  };

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleUp);
};
