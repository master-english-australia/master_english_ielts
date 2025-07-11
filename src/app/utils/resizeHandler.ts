import { RefObject } from "react";

interface ResizeHandlerParams {
  layoutRef: RefObject<HTMLDivElement | null>;
  setWidths: (contentWidth: number, answerWidth: number) => void;
}

export const createResizeHandler = ({
  layoutRef,
  setWidths,
}: ResizeHandlerParams) => {
  return (moveEvent: MouseEvent) => {
    if (!layoutRef.current) return;

    moveEvent.preventDefault();

    const containerRect = layoutRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const x = moveEvent.clientX - containerRect.left;

    let newContentWidth = Math.min(
      Math.max((x / containerWidth) * 100, 10),
      90,
    );
    let newAnswerWidth = 100 - newContentWidth;

    setWidths(newContentWidth, newAnswerWidth);
  };
};
