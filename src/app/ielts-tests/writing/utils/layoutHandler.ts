export const initializeLayout = (
  contentWidth: number,
  answerWidth: number
) => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.add('full-width-app');
  }

  setTimeout(() => {
    const contentElement = document.querySelector('.writing-test-content');
    const answerElement = document.querySelector('.answer-section');
    const resizeHandle = document.querySelector('.resize-handle');
    
    if (contentElement && answerElement && resizeHandle) {
      contentElement.setAttribute('style', 
        `width: ${contentWidth}% !important; 
         max-width: ${contentWidth}% !important; 
         flex: 0 0 ${contentWidth}% !important;`
      );
      
      answerElement.setAttribute('style', 
        `width: ${answerWidth}% !important; 
         max-width: ${answerWidth}% !important; 
         flex: 0 0 ${answerWidth}% !important;`
      );
      
      resizeHandle.setAttribute('style', 
        `right: ${answerWidth}% !important;`
      );
    }
  }, 100);

  return () => {
    if (appElement) {
      appElement.classList.remove('full-width-app');
    }
  };
}; 