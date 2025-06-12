interface Feedback {
  taskAchievement: number;
  coherenceAndCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  overallBand: number;
  comments: string;
}

export const calculateFeedback = (wordCount: number): Feedback => {
  const feedback = {
    taskAchievement: Math.min(9, Math.max(5, Math.floor(wordCount / 50))),
    coherenceAndCohesion: Math.min(9, Math.max(5, Math.floor(wordCount / 60))),
    lexicalResource: Math.min(9, Math.max(5, Math.floor(wordCount / 70))),
    grammaticalRange: Math.min(9, Math.max(5, Math.floor(wordCount / 80))),
    overallBand: 0,
    comments:
      "This is automated feedback. In a real application, this would include detailed comments on your essay structure, language use, and suggestions for improvement.",
  };

  feedback.overallBand =
    Math.round(
      ((feedback.taskAchievement +
        feedback.coherenceAndCohesion +
        feedback.lexicalResource +
        feedback.grammaticalRange) /
        4) *
        10,
    ) / 10;

  return feedback;
};
