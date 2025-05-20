interface ResizeElements {
  contentElement: Element | null;
  answerElement: Element | null;
  resizeHandle: Element | null;
}

interface ResizeState {
  lastContentWidth: number;
  lastAnswerWidth: number;
}

export const createResizeHandler = (
  layoutRef: React.RefObject<HTMLDivElement | null>,
  elements: ResizeElements,
  state: ResizeState
) => {
  const { contentElement, answerElement, resizeHandle } = elements;
  const { lastContentWidth, lastAnswerWidth } = state;

  return (moveEvent: MouseEvent) => {
    if (!layoutRef.current) return;
    
    moveEvent.preventDefault();
    
    const containerRect = layoutRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const x = moveEvent.clientX - containerRect.left;
    
    let newContentWidth = Math.min(Math.max((x / containerWidth) * 100, 10), 90);
    let newAnswerWidth = 100 - newContentWidth;
    
    if (contentElement && answerElement && resizeHandle) {
      (contentElement as HTMLElement).style.width = `${newContentWidth}%`;
      (contentElement as HTMLElement).style.maxWidth = `${newContentWidth}%`;
      (contentElement as HTMLElement).style.flex = `0 0 ${newContentWidth}%`;
      
      (answerElement as HTMLElement).style.width = `${newAnswerWidth}%`;
      (answerElement as HTMLElement).style.maxWidth = `${newAnswerWidth}%`;
      (answerElement as HTMLElement).style.flex = `0 0 ${newAnswerWidth}%`;
      
      (resizeHandle as HTMLElement).style.right = `${newAnswerWidth}%`;
    }
    
    state.lastContentWidth = newContentWidth;
    state.lastAnswerWidth = newAnswerWidth;
  };
}; 