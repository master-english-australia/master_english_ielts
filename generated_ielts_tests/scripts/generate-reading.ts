#!/usr/bin/env -S node --enable-source-maps
/**
 * Generate reading questions.json from reading/<vol>-<test>/fetch.html
 * - Accepts folder/id or fetch.html path; writes questions.json alongside
 * - Extract up to 3 content_html blocks
 * - For each part (1..3), create question_groups by pairing
 *   .ielts-reading-question-section-content with the corresponding
 *   questions block and collecting questions (.ielts-reading-question-item)
 *   where questionText is the item text (number removed) and options come
 *   from <select><option> or .ielts-reading-option spans.
 */

import { load } from "cheerio";
import fs from "fs";
import path from "path";

interface OutputQuestion {
  id: string;
  questionText?: string;
  options?: string[];
}
interface OutputGroup {
  id: string;
  instruction: string;
  questionType:
    | "text_input"
    | "multiple_choice"
    | "matching"
    | "multiple_select_choice"
    | "true_false_not_given";
  questionText?: string;
  questions: OutputQuestion[];
}
interface OutputPart {
  id: string;
  title: string;
  content_html: string;
  instruction: string;
  imageUrl?: string;
  question_groups: OutputGroup[];
}
interface OutputDoc {
  test_id: string;
  title: string;
  parts: OutputPart[];
}

function resolveTarget(arg: string): {
  dir: string;
  fetchPath: string;
  testId: string;
} {
  const looksPathLike = arg.includes("/") || arg.endsWith(".html");
  if (looksPathLike) {
    const abs = path.resolve(arg);
    const dir = fs.statSync(abs).isDirectory() ? abs : path.dirname(abs);
    const fetchPath = fs.statSync(abs).isDirectory()
      ? path.join(abs, "fetch.html")
      : abs;
    const testId = path.basename(dir);
    return { dir, fetchPath, testId };
  }
  const dir = path.resolve("generated_ielts_tests/reading", arg);
  const fetchPath = path.join(dir, "fetch.html");
  const testId = arg;
  return { dir, fetchPath, testId };
}

function readHtml(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function outerHTML($: ReturnType<typeof load>, elOrSelector: any): string {
  const $el =
    typeof elOrSelector === "string"
      ? $(elOrSelector).first()
      : $(elOrSelector).first();
  if (!$el.length) return "";
  const $wrap = load("<root></root>");
  $wrap("root").append($el.clone());
  return $wrap("root").html() ?? "";
}

function extractContentHtml($: ReturnType<typeof load>): string[] {
  const parts: string[] = [];
  for (let i = 1; i <= 3; i += 1) {
    const html = outerHTML($, `#ielts-reading-transcript-${i}`);
    if (html) parts[i - 1] = html;
  }
  if (parts.filter(Boolean).length < 3) {
    const currents = $(".ielts-reading-transcript.current");
    currents.each((idx, el) => {
      if (!parts[idx]) parts[idx] = outerHTML($, el);
    });
  }
  if (parts.filter(Boolean).length < 3) {
    $(".ielts-reading-transcript").each((idx, el) => {
      if (!parts[idx]) parts[idx] = outerHTML($, el);
    });
  }
  if (parts.filter(Boolean).length < 3) {
    const entry = $(".entry-content").first();
    if (entry.length) {
      for (let i = 0; i < 3; i += 1)
        if (!parts[i]) parts[i] = outerHTML($, entry);
    }
  }
  return parts.slice(0, 3).map((h) => h || "");
}

function imageFromPart(
  $: ReturnType<typeof load>,
  partNumber: number,
): string | undefined {
  const container = $(
    `.ielts-reading-question-section[data-part-number="${partNumber}"]`,
  ).first();
  if (!container.length) return undefined;
  const el = container.find(".ielts-reading-image").first();
  if (!el || !el.length) return undefined;
  const pickFromSrcset = (srcset?: string): string | undefined => {
    if (!srcset) return undefined;
    const first = srcset.split(",")[0]?.trim();
    return first?.split(/\s+/)[0];
  };
  const src =
    el.attr("src")?.trim() ||
    el.attr("data-src")?.trim() ||
    pickFromSrcset(el.attr("srcset")?.trim());
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  const baseHref = $("base[href]").attr("href")?.trim();
  try {
    return baseHref ? new URL(src, baseHref).href : src;
  } catch {
    return src;
  }
}

function normalizeSpaces(s: string): string {
  return (s || "").replace(/\s+/g, " ").trim();
}

function normCue(s: string): string {
  return normalizeSpaces(s).toLowerCase();
}

function stripTrailingOptions(text: string): string {
  let t = text || "";
  // Strip trailing single-letter options like A B C D E F
  t = t.replace(/\s*(?:[A-F]\s*){2,10}$/i, "");
  // Strip trailing TF/NG options, allowing an optional leading letter glued to the word (e.g., ATRUE)
  t = t.replace(/\s*(?:[A-F]?\s*(?:TRUE|FALSE|NOT\s*GIVEN)\s*){2,10}$/i, "");
  // Strip trailing roman numerals i..viii sequences
  t = t.replace(/\s*(?:(?:i{1,3}|iv|v|vi{1,3}|vii|viii)\s*){3,12}$/i, "");
  return normalizeSpaces(t);
}

function isAllLetterOptions(questions: OutputQuestion[]): boolean {
  if (questions.length === 0) return false;
  return questions.every(
    (q) =>
      Array.isArray(q.options) &&
      (q.options as string[]).every((o) => /^[A-Z]$/.test(o)),
  );
}

function inferQuestionTypeForGroup(
  groupInstruction: string,
  questions: OutputQuestion[],
  $scope?: any,
): OutputGroup["questionType"] {
  const instr = normCue(groupInstruction);
  // True/False/Not Given
  const looksTFNGInstr =
    instr.includes("true") &&
    (instr.includes("false") || instr.includes("not given"));
  const looksTFNGOpts =
    questions.length > 0 &&
    questions.every((q) => {
      const opts = q.options || [];
      const set = new Set(
        opts.map((o) => o.toUpperCase().replace(/\s+/g, " ")),
      );
      return (
        set.has("TRUE") &&
        set.has("FALSE") &&
        (set.has("NOT GIVEN") || set.has("NOTGIVEN"))
      );
    });
  if (looksTFNGInstr || looksTFNGOpts) return "true_false_not_given";

  // Check for data-limit attribute on checkbox inputs (multiple select choice)
  if ($scope && $scope.find('input[type="checkbox"][data-limit]').length > 0) {
    return "multiple_select_choice";
  }

  // Multiple select choice
  if (/choose\s+(two|three|two\s+letters|two\s+options)/i.test(instr))
    return "multiple_select_choice";

  // Matching
  if (/list of headings|choose the correct heading/i.test(instr))
    return "matching";
  if (/\b[a-z]\s*[-–—〜~]\s*[a-z]\b/i.test(groupInstruction)) return "matching";
  if (isAllLetterOptions(questions)) return "matching";

  // Multiple choice
  const anyHasOptions = questions.some(
    (q) => Array.isArray(q.options) && (q.options as string[]).length >= 2,
  );
  if (anyHasOptions) return "multiple_choice";

  // Default
  return "text_input";
}

function extractGroupsForPart(
  $: ReturnType<typeof load>,
  partNumber: number,
): OutputGroup[] {
  const container = $(
    `.ielts-reading-question-section[data-part-number="${partNumber}"]`,
  ).first();
  if (!container.length) return [];
  const contents = container
    .find(".ielts-reading-question-section-content")
    .toArray();
  const questionsBlocks = container.find(".ielts-reading-questions").toArray();
  const groups: OutputGroup[] = [];
  let nextGroupId = 1;

  contents.forEach((el, idx) => {
    const $content = $(el);
    const qb = questionsBlocks[idx] ? $(questionsBlocks[idx]) : undefined;

    // Build normalized group text with blanks for inline inputs
    const $norm = $content.clone();
    $norm.find("input,select,button,label").remove();
    $norm.find(".ielts-reading-question-item").each((_, node) => {
      $(node).replaceWith(" ______ ");
    });
    const normalizedGroupHtml = $norm.html() || $content.html() || "";

    const collect = ($scope: any): OutputQuestion[] => {
      const results: OutputQuestion[] = [];
      if (!$scope || !$scope.length) return results;
      $scope.find(".ielts-reading-question-item").each((_: number, it: any) => {
        const $it = $(it);
        const numText = $it
          .find(".ielts-reading-question-number")
          .first()
          .text()
          .trim();
        const idNum = parseInt(numText, 10);
        if (!Number.isFinite(idNum)) return;

        // Check for data-limit attribute on checkbox inputs (multiple select choice)
        const dataLimit = $it
          .find('input[type="checkbox"][data-limit]')
          .attr("data-limit");
        const limit = dataLimit ? parseInt(dataLimit, 10) : 1;
        const clone = $it.clone();
        clone.find(".ielts-reading-question-number").remove();
        // Remove options before extracting question text
        clone.find(".ielts-reading-option").remove();
        clone.find("select").remove();
        const rawText = normalizeSpaces(clone.text());
        const qText = stripTrailingOptions(rawText);
        let options: string[] = [];
        $it.find("select option").each((__, opt) => {
          const val = ($(opt).attr("value") || "").trim();
          const txt = ($(opt).text() || "").trim();
          const v = (txt || val).trim();
          if (v && v !== "-") options.push(v);
        });
        if (options.length === 0) {
          $it.find(".ielts-reading-option span").each((__, sp) => {
            const txt = normalizeSpaces($(sp).text());
            if (txt) options.push(txt);
          });
        }
        // Create multiple questions based on data-limit
        for (let i = 0; i < limit; i++) {
          const q: OutputQuestion = { id: String(idNum + i) };
          if (qText) q.questionText = qText;
          if (options.length) q.options = options;
          results.push(q);
        }
      });
      return results;
    };

    // Prefer qb, but fall back to content if no items found
    let questions = collect(qb && qb.length ? qb : $content);
    if (questions.length === 0) questions = collect($content);

    // de-dup and sort by id
    const seen = new Set<string>();
    questions = questions
      .filter((q) => {
        if (seen.has(q.id)) return false;
        seen.add(q.id);
        return true;
      })
      .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

    const instructionText = normalizeSpaces($content.text() || "");
    const qtype = inferQuestionTypeForGroup(
      instructionText,
      questions,
      qb && qb.length ? qb : $content,
    );

    // Normalize options for TF/NG if needed
    if (qtype === "true_false_not_given") {
      questions = questions.map((q) => ({
        ...q,
        options: ["TRUE", "FALSE", "NOT GIVEN"],
      }));
    }

    groups.push({
      id: String(nextGroupId++),
      instruction: "",
      questionType: qtype,
      questionText: normalizedGroupHtml,
      questions,
    });
  });

  return groups;
}

function buildOutput($: ReturnType<typeof load>, testId: string): OutputDoc {
  const [c1, c2, c3] = extractContentHtml($);
  const images = [1, 2, 3].map((p) => imageFromPart($, p));
  const parts: OutputPart[] = [1, 2, 3].map((p, idx) => ({
    id: String(p),
    title: "",
    content_html: [c1, c2, c3][idx] || "",
    instruction: "",
    ...(images[idx] ? { imageUrl: images[idx] as string } : {}),
    question_groups: extractGroupsForPart($, p),
  }));
  return { test_id: testId, title: "", parts };
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/generate-reading.ts generated_ielts_tests/reading/<vol>-<test>[ /fetch.html]|<vol>-<test>",
    );
    process.exit(1);
  }
  const { dir, fetchPath, testId } = resolveTarget(arg);
  if (!fs.existsSync(fetchPath)) {
    console.error(`fetch.html not found: ${fetchPath}`);
    process.exit(1);
  }
  const html = readHtml(fetchPath);
  const $ = load(html);
  const out = buildOutput($, testId);
  const outPath = path.join(dir, "questions.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  process.stdout.write(`${outPath} written.\n`);
}

main();
