import { load } from "cheerio";
import fs from "fs";
import path from "path";

type OutputDoc = { test_id: string; parts: any[] };

function resolveTarget(arg: string): { testId: string; dir: string } {
  const isPathLike = arg.includes("/") || arg.endsWith(".html");
  if (isPathLike) {
    const abs = path.resolve(arg);
    const dir = fs.statSync(abs).isDirectory() ? abs : path.dirname(abs);
    const testId = path.basename(dir);
    return { testId, dir };
  }
  const testId = arg.trim();
  const dir = path.resolve("listening", testId);
  return { testId, dir };
}

function writeQuestionsJson(dir: string, data: OutputDoc): void {
  const outPath = path.join(dir, "questions.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function instructionFor(partId: number): string {
  switch (partId) {
    case 1:
      return "Listen and answer questions 1-10";
    case 2:
      return "Listen and answer questions 11-20";
    case 3:
      return "Listen and answer questions 21-30";
    case 4:
      return "Listen and answer questions 31-40";
    default:
      return "";
  }
}

function buildParts(testId: string): any[] {
  return [1, 2, 3, 4].map((n) => ({
    id: String(n),
    content_html: "",
    instruction: instructionFor(n),
    audio_url: `listening/${testId}/part${n}.mp3`,
    question_groups: [],
  }));
}

function containsTextInputCue(htmlOrText: string | undefined): boolean {
  if (!htmlOrText) return false;
  const s = normalizeForCue(htmlOrText);
  const cues = [
    "complete the table below",
    "complete the flowchart below",
    "complete the flow-chart below",
    "complete the notes below",
    "complete the sentences below",
  ];
  return cues.some((cue) => s.includes(cue));
}

function containsMultipleChoiceCue(htmlOrText: string | undefined): boolean {
  if (!htmlOrText) return false;
  const s = normalizeForCue(htmlOrText);
  return s.includes("choose the correct letter");
}

function containsMultipleSelectCue(htmlOrText: string | undefined): boolean {
  if (!htmlOrText) return false;
  const s = normalizeForCue(htmlOrText);
  return s.includes("choose two letters");
}

function normalizeForCue(input: string | undefined): string {
  if (!input) return "";
  return String(input)
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function parseTimeToSeconds(timeText: string | undefined): number | undefined {
  if (!timeText) return undefined;
  const s = String(timeText).trim();
  if (!s) return undefined;
  // Support HH:MM:SS or MM:SS (zero-padded or not)
  const parts = s.split(":").map((t) => t.trim());
  if (parts.some((p) => p === "" || /\D/.test(p))) return undefined;
  const nums = parts.map((p) => parseInt(p, 10));
  if (nums.some((n) => Number.isNaN(n))) return undefined;
  let sec = 0;
  if (nums.length === 3) {
    const [hh, mm, ss] = nums;
    sec = hh * 3600 + mm * 60 + ss;
  } else if (nums.length === 2) {
    const [mm, ss] = nums;
    sec = mm * 60 + ss;
  } else if (nums.length === 1) {
    sec = nums[0];
  } else {
    return undefined;
  }
  return sec;
}

function attachEmptyGroupsFromHtml(dir: string, parts: any[]): void {
  const htmlPath = path.join(dir, "fetch.html");
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = load(html);

  let nextGroupId = 1;
  for (let p = 1; p <= 4; p += 1) {
    const container = $(`#ielts-listening-question-section-${p}`);
    const groups: any[] = [];
    if (container.length) {
      const contents = container
        .find(".ielts-listening-question-section-content")
        .toArray();
      const starts = container
        .find(".ielts-listening-section-start-time-button[data-start-time]")
        .toArray()
        .map((el) => parseTimeToSeconds($(el).attr("data-start-time")));
      const questionsBlocks = container
        .find(".ielts-listening-questions")
        .toArray();

      contents.forEach((el, i) => {
        const $content = $(el);
        const val = starts[i];
        const seek =
          typeof val === "number" && Number.isFinite(val) ? val : undefined;
        const questionText = $content.html() || undefined;

        const qb = questionsBlocks[i] ? $(questionsBlocks[i]) : undefined;
        const questions: any[] = [];

        const extractQuestions = (
          $scope: any,
          kind: "qb" | "content",
        ): Array<{ id: string; questionText?: string; options?: string[] }> => {
          const results: Array<{
            id: string;
            questionText?: string;
            options?: string[];
          }> = [];
          if (!$scope || !$scope.length) return results;
          const items = $scope.find(".ielts-listening-question-item").toArray();
          items.forEach((it: any) => {
            const $it = $(it);
            const numText = (
              $it.find(".ielts-listening-question-number").first().text() || ""
            ).trim();
            const idNum = parseInt(numText, 10);
            if (!Number.isFinite(idNum) || idNum < 1 || idNum > 40) return;
            if (kind === "content") {
              results.push({ id: String(idNum) });
              return;
            }
            // question text
            const promptEl = $it
              .find("span")
              .filter(
                (_: any, s: any) =>
                  $(s).closest(".ielts-listening-option").length === 0,
              )
              .first();
            let questionText =
              promptEl && promptEl.length
                ? (promptEl.text() || "")
                    .replace(/\s+/g, " ")
                    .replace(/[\u00A0\u200B]+/g, " ")
                    .trim()
                : undefined;
            if (questionText) {
              questionText = questionText.replace(/^(?:\d+\s*)+/, "").trim();
            }

            let options: string[] = $it
              .find(".ielts-listening-option")
              .toArray()
              .map((op: any) => {
                const $op = $(op).clone();
                $op.find("label,input,button").remove();
                const sp = $op.find("span").first();
                const txt = sp.length ? sp.text().trim() : $op.text().trim();
                return txt;
              })
              .filter((t: string) => t && t.length > 0);

            // Fallback 1: <select><option>…</option></select>
            if (options.length === 0) {
              options = $it
                .find("select option")
                .toArray()
                .map((opt: any) => {
                  const $opt = $(opt);
                  const val = ($opt.attr("value") || "").trim();
                  const txt = ($opt.text() || "").trim();
                  return (txt && txt.length > 0 ? txt : val).trim();
                })
                .filter((t: string) => t && t.length > 0 && t !== "-");
            }

            // Fallback 2: label letters (A, B, C, ...)
            if (options.length === 0) {
              const letters = $it
                .find("label")
                .toArray()
                .map((lb: any) => ($(lb).text() || "").trim())
                .map((t: string) => t.replace(/[^A-Za-z]/g, ""))
                .filter((t: string) => /^[A-Z]$/.test(t));
              const seenOpt = new Set<string>();
              letters.forEach((l) => {
                if (!seenOpt.has(l)) seenOpt.add(l);
              });
              options = Array.from(seenOpt);
            }
            const q: any = { id: String(idNum) };
            if (questionText) q.questionText = questionText;
            if (options.length > 0) q.options = options;
            results.push(q);
          });
          return results;
        };

        let items = extractQuestions(qb, "qb");
        if (items.length === 0) items = extractQuestions($content, "content");
        const seenLocal = new Set<string>();
        items
          .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
          .forEach((q) => {
            if (seenLocal.has(q.id)) return;
            seenLocal.add(q.id);
            questions.push(q);
          });

        let questionType: string = "matching";
        if (containsTextInputCue(questionText)) {
          questionType = "text_input";
        } else if (containsMultipleSelectCue(questionText)) {
          questionType = "multiple_select_choice";
        } else if (containsMultipleChoiceCue(questionText)) {
          questionType = "multiple_choice";
        } else {
          questionType = "matching";
        }

        // If this is a multiple_select_choice block, ensure we create one question per number id
        if (questionType === "multiple_select_choice") {
          const extractIds = ($scope: any): number[] => {
            if (!$scope || !$scope.length) return [];
            let nums: number[] = $scope
              .find('[id^="ielts-listening-question-number-"]')
              .toArray()
              .map((n: any): string => String($(n).attr("id") || ""))
              .map(
                (id: string): string | undefined =>
                  id.match(/ielts-listening-question-number-(\d+)/)?.[1],
              )
              .filter((s: string | undefined): s is string => Boolean(s))
              .map((s: string): number => parseInt(s, 10))
              .filter((n: number) => Number.isFinite(n));
            if (nums.length === 0) {
              nums = $scope
                .find(".ielts-listening-question-number")
                .toArray()
                .map((n: any): number =>
                  parseInt(($(n).text() || "").trim(), 10),
                )
                .filter((n: number) => Number.isFinite(n));
            }
            const set = new Set<number>();
            nums.forEach((n) => {
              if (n >= 1 && n <= 40) set.add(n);
            });
            return Array.from(set).sort((a, b) => a - b);
          };

          const ids = extractIds(qb && qb.length ? qb : $content);
          if (ids.length >= 2) {
            // Compute group prompt and options to reuse
            const computePrompt = (): string | undefined => {
              if (questions.length > 0 && questions[0].questionText)
                return questions[0].questionText;
              if (qb && qb.length) {
                let lastNumEl = qb
                  .find('[id^="ielts-listening-question-number-"]')
                  .last();
                if (!lastNumEl.length)
                  lastNumEl = qb
                    .find(".ielts-listening-question-number")
                    .last();
                const prompt = lastNumEl.nextAll("span").first();
                const txt = prompt && prompt.length ? prompt.text() || "" : "";
                const norm = txt
                  .replace(/\s+/g, " ")
                  .replace(/[\u00A0\u200B]+/g, " ")
                  .trim();
                return norm
                  ? norm.replace(/^(?:\d+\s*)+/, "").trim()
                  : undefined;
              }
              return undefined;
            };
            const computeOptions = (): string[] | undefined => {
              // Prefer options of first parsed question
              const firstWithOpts = questions.find(
                (q) => Array.isArray(q.options) && q.options.length > 0,
              );
              if (firstWithOpts) return firstWithOpts.options;
              if (qb && qb.length) {
                // Try .ielts-listening-option
                let opts: string[] = qb
                  .find(".ielts-listening-option")
                  .toArray()
                  .map((op: any) => {
                    const $op = $(op).clone();
                    $op.find("label,input,button").remove();
                    const sp = $op.find("span").first();
                    const txt = sp.length
                      ? sp.text().trim()
                      : $op.text().trim();
                    return txt;
                  })
                  .filter((t: string) => t && t.length > 0);
                if (opts.length === 0) {
                  opts = qb
                    .find("select option")
                    .toArray()
                    .map(
                      (opt: any) =>
                        ($(opt).text() || "").trim() ||
                        String($(opt).attr("value") || "").trim(),
                    )
                    .filter((t: string) => t && t.length > 0 && t !== "-");
                }
                if (opts.length === 0) {
                  const letters = qb
                    .find("label")
                    .toArray()
                    .map((lb: any) =>
                      ($(lb).text() || "").trim().replace(/[^A-Za-z]/g, ""),
                    )
                    .filter((t: string) => /^[A-Z]$/.test(t));
                  const seen = new Set<string>();
                  letters.forEach((l) => {
                    if (!seen.has(l)) seen.add(l);
                  });
                  opts = Array.from(seen);
                }
                return opts.length ? opts : undefined;
              }
              return undefined;
            };

            const promptText = computePrompt();
            const groupOptions = computeOptions();
            const byId = new Map<string, any>();
            questions.forEach((q) => byId.set(q.id, q));
            ids.forEach((n) => {
              const key = String(n);
              const existing = byId.get(key);
              if (existing) {
                if (promptText && !existing.questionText)
                  existing.questionText = promptText;
                if (
                  groupOptions &&
                  (!Array.isArray(existing.options) ||
                    existing.options.length === 0)
                )
                  existing.options = groupOptions;
              } else {
                const q: any = { id: key };
                if (promptText) q.questionText = promptText;
                if (groupOptions) q.options = groupOptions;
                questions.push(q);
              }
            });
            questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
          }
        }

        // For text_input groups: replace inline placeholders with blanks in group questionText
        let normalizedGroupText = questionText;
        if (questionType === "text_input" && questionText) {
          const _$ = load(`<root>${questionText}</root>`);
          const $root = _$("root");
          $root.find("input,select,button,label").remove();
          $root.find(".ielts-listening-question-item").each((_, node) => {
            _$(node).replaceWith(" ______ ");
          });
          normalizedGroupText = $root.html() || questionText;
        }

        groups.push({
          id: String(nextGroupId++),
          questionText: normalizedGroupText,
          questionType,
          questions,
          seekPosition: seek,
        });
      });
    }
    parts[p - 1].question_groups = groups;
  }
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    process.stderr.write(
      "Usage: tsx scripts/generate-listening.ts <test-id|path-to-dir-or-html>\n",
    );
    process.exit(1);
  }
  const { testId, dir } = resolveTarget(arg);
  const parts = buildParts(testId);
  attachEmptyGroupsFromHtml(dir, parts);
  const out: OutputDoc = { test_id: testId, parts };
  writeQuestionsJson(dir, out);
  process.stdout.write(`${path.join(dir, "questions.json")} written.\n`);
}

main();
