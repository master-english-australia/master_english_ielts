export function normalizeAnswer(value: string): string {
  return (value || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function expandOptionalParenthesesVariants(raw: string): string[] {
  const results = new Set<string>();

  const helper = (s: string) => {
    const start = s.indexOf("(");
    if (start === -1) {
      results.add(s);
      return;
    }
    const end = s.indexOf(")", start + 1);
    if (end === -1) {
      results.add(s);
      return;
    }

    const before = s.slice(0, start);
    const inside = s.slice(start + 1, end);
    const after = s.slice(end + 1);

    // Include the content inside parentheses (remove the parentheses themselves)
    helper(before + inside + after);
    // Exclude the entire parenthetical group
    helper(before + after);
  };

  helper(raw || "");

  return Array.from(results).map((v) => v.replace(/\s{2,}/g, " ").trim());
}

export function isAnswerCorrect(
  userAnswer: string,
  correctAnswers: string[],
): boolean {
  const userVariants = new Set(
    expandOptionalParenthesesVariants(userAnswer)
      .map(normalizeAnswer)
      .filter(Boolean),
  );
  if (userVariants.size === 0) return false;

  return (correctAnswers || []).some((answer) => {
    const correctVariants = expandOptionalParenthesesVariants(answer)
      .map(normalizeAnswer)
      .filter(Boolean);
    return correctVariants.some((variant) => userVariants.has(variant));
  });
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
