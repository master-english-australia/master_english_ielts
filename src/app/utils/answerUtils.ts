export function normalizeAnswer(value: string): string {
  return (value || "").trim().toLowerCase();
}

export function isAnswerCorrect(
  userAnswer: string,
  correctAnswers: string[],
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  if (!normalizedUser) return false;
  return (correctAnswers || []).some(
    (answer) => normalizeAnswer(answer) === normalizedUser,
  );
}

export function isMultiSelectCorrect(
  userAnswerCsv: string,
  correctAnswers: string[],
  delimiter: string = ",",
): boolean {
  const userSelections = (userAnswerCsv || "")
    .split(delimiter)
    .map(normalizeAnswer)
    .filter(Boolean);
  const normalizedCorrect = (correctAnswers || [])
    .map(normalizeAnswer)
    .filter(Boolean);

  if (userSelections.length !== normalizedCorrect.length) return false;
  return normalizedCorrect.every((ans) => userSelections.includes(ans));
}
