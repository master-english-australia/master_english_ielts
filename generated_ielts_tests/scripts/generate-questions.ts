#!/usr/bin/env -S node --enable-source-maps
/**
 * Generate questions.json from a reading/xx-x/fetch.html
 * Usage:
 *   npx tsx scripts/generate-questions.ts reading/17-3/fetch.html > reading/17-3/questions.json
 */

import { CheerioAPI, load } from "cheerio";
import type { AnyNode } from "domhandler";
import fs from "fs";
import path from "path";

type QuestionType =
  | "multiple_choice"
  | "matching"
  | "true_false_not_given"
  | "text_input"
  | "multiple_select_choice";

interface OutputQuestion {
  id: string;
  questionText: string;
  options?: string[];
}

// Internal holder to keep raw HTML until we finalize per type
interface ExtractedQuestion extends OutputQuestion {
  __html?: string;
}

// Internal group that keeps sectionHtml and extracted questions with HTML
type DraftGroup = OutputGroup & {
  sectionHtml: string;
  questions: ExtractedQuestion[];
};

interface OutputGroup {
  id: string;
  instruction: string;
  questionType: QuestionType;
  questionText?: string;
  questions: OutputQuestion[];
}

interface OutputPart {
  id: string;
  title: string;
  content_html: string;
  instruction: string;
  question_groups: OutputGroup[];
}

interface OutputDoc {
  test_id: string;
  title: string;
  parts: OutputPart[];
}

// Collect palette numbers per part from the right-side number list
function collectPalette($: CheerioAPI): Array<Set<number>> {
  const perPart: Array<Set<number>> = [new Set(), new Set(), new Set()];
  $("div.ielts-reading-palette-section[data-part-number]").each((_i, sec) => {
    const partNum = parseInt($(sec).attr("data-part-number") || "0", 10);
    if (partNum >= 1 && partNum <= 3) {
      $(sec)
        .find("[data-question-number]")
        .each((__, el) => {
          const n = parseInt($(el).attr("data-question-number") || "0", 10);
          if (!Number.isNaN(n)) perPart[partNum - 1].add(n);
        });
    }
  });
  return perPart;
}

function readHtml(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function outerHTML($: CheerioAPI, el: AnyNode): string {
  const $wrap = load("<root></root>");
  $wrap("root").append($(el).clone());
  return $wrap("root").html() ?? "";
}

function normalizeSpaces(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function extractContentHtml($: CheerioAPI): string[] {
  const parts: string[] = [];
  // Priority: id → current → generic transcript → entry-content
  for (let i = 1; i <= 3; i += 1) {
    const el = $(`#ielts-reading-transcript-${i}`).first();
    if (el.length) parts[i - 1] = outerHTML($, el.get(0) as AnyNode);
  }
  if (parts.filter(Boolean).length < 3) {
    const currents = $(".ielts-reading-transcript.current");
    currents.each((idx, el) => {
      if (!parts[idx]) parts[idx] = outerHTML($, el);
    });
  }
  // Fallback to generic transcript blocks
  if (parts.filter(Boolean).length < 3) {
    $(".ielts-reading-transcript").each((idx, el) => {
      if (!parts[idx]) parts[idx] = outerHTML($, el);
    });
  }
  // Final fallback to entry-content
  if (parts.filter(Boolean).length < 3) {
    const entry = $(".entry-content").first();
    if (entry.length) {
      for (let i = 0; i < 3; i += 1)
        if (!parts[i]) parts[i] = outerHTML($, entry.get(0) as AnyNode);
    }
  }
  return parts.slice(0, 3).map((h) => h || "");
}

function extractGroups($: CheerioAPI): DraftGroup[][] {
  const groupsByPart: DraftGroup[][] = [[], [], []];
  $(".ielts-reading-question-section").each((_, section) => {
    const $section = $(section);
    const partAttr = $section.attr("data-part-number");
    const partIdx = partAttr
      ? Math.max(0, Math.min(2, parseInt(partAttr, 10) - 1))
      : 0;

    const $content = $section
      .find(".ielts-reading-question-section-content")
      .first();

    const isAnchor = (t: string) =>
      /(?:question|questions)\s+\d+\s*[-–—−〜~]\s*\d+|list of headings|complete the|do the following statements|choose the correct heading/i.test(
        t,
      );

    const anchors = $content
      .children()
      .filter((_, el) => isAnchor(normalizeSpaces($(el).text())))
      .toArray();

    const pushSingleGroup = () => {
      const instruction = normalizeSpaces($content.text() || "");
      const sectionHtml = $content.html() || "";
      const questions = collectItemsWithin($content);
      groupsByPart[partIdx].push({
        id: "",
        instruction,
        questionType: "text_input",
        sectionHtml,
        questions,
      } as DraftGroup);
    };

    if (anchors.length === 0) {
      pushSingleGroup();
      return;
    }

    for (let i = 0; i < anchors.length; i += 1) {
      const start = anchors[i];
      const end = anchors[i + 1];
      const $block = $(start).nextUntil(end).addBack();

      const startText = normalizeSpaces($(start).text());
      const instruction = normalizeSpaces(
        startText +
          " " +
          $block
            .filter((_, el) => !$(el).is(".ielts-reading-question-item"))
            .text(),
      );
      const sectionHtml = $block
        .map((__, el) => outerHTML($, el))
        .get()
        .join("");

      let questions = collectItemsWithin($block);

      const m = startText.match(/(?:questions?)\s+(\d+)\s*[-–—−〜~]\s*(\d+)/i);
      if (m) {
        const from = parseInt(m[1], 10);
        const to = parseInt(m[2], 10);
        if (!Number.isNaN(from) && !Number.isNaN(to) && to >= from) {
          questions = questions.filter((q) => {
            const n = parseInt(q.id, 10);
            return !Number.isNaN(n) && n >= from && n <= to;
          });
        }
      }

      groupsByPart[partIdx].push({
        id: "",
        instruction,
        questionType: "text_input",
        sectionHtml,
        questions,
      } as DraftGroup);
    }
  });
  return groupsByPart;

  function collectItemsWithin($scope: any): ExtractedQuestion[] {
    const qs: ExtractedQuestion[] = [];
    $scope.find(".ielts-reading-question-item").each((__: any, item: any) => {
      const $item = $(item);
      const idText = $item
        .find(".ielts-reading-question-number")
        .first()
        .text()
        .trim();
      const qid = idText || "";
      if (!qid) return;

      const clone = $item.clone();
      clone.find(".ielts-reading-question-number").remove();
      const qHtml = clone.html() ?? "";
      const qText = normalizeSpaces(clone.text());

      const options: string[] = [];
      clone.find("select option").each((___: any, opt: any) => {
        const val = $(opt).attr("value");
        if (val) options.push(val.trim());
      });
      if (options.length === 0) {
        clone.find(".ielts-reading-option span").each((___: any, sp: any) => {
          const txt = normalizeSpaces($(sp).text());
          if (txt) options.push(txt);
        });
      }
      if (options.length === 0) {
        clone
          .find("ul.options > li, ol.options > li")
          .each((___: any, li: any) => {
            const t = normalizeSpaces($(li).text());
            if (t) options.push(t);
          });
      }

      const q: ExtractedQuestion = {
        id: qid,
        questionText: qText,
        __html: qHtml,
      };
      if (options.length > 0) q.options = options;
      qs.push(q);
    });
    return qs;
  }
}

function deriveAlphaRange(instr: string): string[] {
  const m = instr.match(/\b([A-Z])\s*[-–—−〜~]\s*([A-Z])\b/);
  if (!m) return [];
  const a = m[1].charCodeAt(0);
  const b = m[2].charCodeAt(0);
  if (b < a || b - a > 25) return [];
  return Array.from({ length: b - a + 1 }, (_, i) =>
    String.fromCharCode(a + i),
  );
}

function inferQuestionType(group: OutputGroup): QuestionType {
  const instr = (group.instruction || "").toLowerCase();
  // Prefer explicit cues: TF/NG → matching → text_input → MCQ
  if (instr.includes("true") && instr.includes("not given"))
    return "true_false_not_given";
  if (
    instr.includes("list of headings") ||
    instr.includes("choose the correct heading")
  )
    return "matching";
  // Also consider letter ranges like A–F / A–G as matching
  if (/\b[a-z]\s*[-–—−〜~]\s*[a-z]\b/i.test(group.instruction || ""))
    return "matching";
  if (
    /choose\s+(one|no\s+more\s+than\s+one)\s+word/i.test(instr) ||
    /complete/i.test(instr)
  )
    return "text_input";
  if (
    group.questions.length > 0 &&
    group.questions.every(
      (q) => Array.isArray(q.options) && q.options!.length === 3,
    ) &&
    group.questions.some((q) =>
      (q.options || []).some((o) => /TRUE|FALSE|NOT\s*GIVEN/i.test(o)),
    )
  ) {
    return "true_false_not_given";
  }
  if (
    group.questions.length > 0 &&
    group.questions.every(
      (q) => Array.isArray(q.options) && q.options!.length >= 2,
    )
  ) {
    const allSingleLetters = group.questions.every((q) =>
      (q.options || []).every((o) => /^[A-Z]$/.test(o)),
    );
    return allSingleLetters ? "matching" : "multiple_choice";
  }
  return "text_input";
}

function ensureBlankHtml(html: string): string {
  if (!html) return "<p>______</p>";
  if (html.includes("______")) return html;
  const $ = load(html);
  // Remove form controls
  $("input,select,button,label").remove();
  const last = $("p,li").last();
  if (last.length) {
    last.append(" ______");
    return $.root().html() ?? "<p>______</p>";
  }
  return `<p>${normalizeSpaces(html)} ______</p>`;
}

function extractOptionsFrom(html: string): string[] {
  const $ = load(html);
  // Try to extract roman numerals (i, ii, ... viii) from text lines first
  const text = $.root().text();
  const lines = text.split(/\r?\n|\s{2,}/g).map((s) => normalizeSpaces(s));
  const romans = lines
    .map((ln) => ln.match(/^\(?\s*([ivxlcdm]+)[).\-\s]+/i)?.[1])
    .filter(Boolean)
    .map((s) => (s as string).toLowerCase())
    .filter((s) => s.length <= 6)
    .slice(0, 12) as string[];
  if (romans.length >= 3) return romans;

  // Fallback: list after a heading that mentions List of Headings, else first ul/ol
  const afterHeadings = $('h3:contains("List of Headings")')
    .first()
    .nextAll("ul,ol")
    .first();
  const list = afterHeadings.length ? afterHeadings : $("ul,ol").first();
  const items = list
    .find("> li")
    .map((_i, el) => normalizeSpaces($(el).text()))
    .get()
    .filter((s) => s && s.length <= 80)
    .slice(0, 12);
  if (items.length >= 3) return items;

  // Final fallback: typical roman set
  return ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
}

function buildOutput($: CheerioAPI, fetchPath: string): OutputDoc {
  const [c1, c2, c3] = extractContentHtml($);
  const groupsByPart = extractGroups($);
  const palette = collectPalette($);

  // Global sequential ID allocator
  let nextId = 1;
  const newId = () => String(nextId++);

  const parts: OutputPart[] = [1, 2, 3].map((n, idx) => {
    const partGroups = (groupsByPart[idx] || []) as DraftGroup[];
    // process each group
    partGroups.forEach((g) => {
      g.questionType = inferQuestionType(g);
      if (g.questionType === "matching") {
        let opts = extractOptionsFrom(g.sectionHtml);
        if (opts.length === 0) {
          const letters = deriveAlphaRange(g.instruction || "");
          if (letters.length) opts = letters;
        }
        g.questionText = g.sectionHtml;
        g.questions = g.questions.map((q) => ({
          ...q,
          options: opts.length ? opts : ["A", "B", "C", "D", "E", "F"],
        }));
      }
      if (g.questionType === "true_false_not_given") {
        g.questions = g.questions.map((q) => ({
          ...q,
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        }));
      }
      if (g.questionType === "multiple_choice") {
        g.questions = g.questions.map((q) => ({
          ...q,
          options:
            q.options && q.options.length >= 2
              ? q.options
              : ["A", "B", "C", "D"],
        }));
      }
      if (g.questionType === "text_input") {
        g.questionText = g.sectionHtml;
      }
      // finalize questionText
      g.questions = g.questions.map((q) => {
        const rawHtml = (q as any).__html as string | undefined;
        if (g.questionType === "text_input") {
          const html = rawHtml || q.questionText;
          return {
            id: q.id,
            questionText: ensureBlankHtml(html),
          } as OutputQuestion;
        }
        const plain0 = normalizeSpaces(load(rawHtml || q.questionText).text());
        const plain =
          g.questionType === "true_false_not_given"
            ? plain0.replace(/\s*[A-Z](\s+[A-Z]){1,20}\s*$/, "")
            : plain0;
        return {
          id: q.id,
          questionText: plain,
          options: q.options,
        } as OutputQuestion;
      });

      // Palette-based normalization for this part: keep only numbers in palette, sort, de-dup, drop empties
      const pset = palette[idx];
      if (pset && pset.size > 0) {
        const seen = new Set<string>();
        g.questions = g.questions
          .filter((q) => {
            const n = parseInt(q.id, 10);
            return !Number.isNaN(n) && pset.has(n);
          })
          .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
          .filter((q) => {
            if (seen.has(q.id)) return false;
            seen.add(q.id);
            const hasText = (q.questionText || "").trim().length > 0;
            const hasOpts = Array.isArray(q.options) && q.options.length > 0;
            return hasText || hasOpts;
          });
      }
    });
    const title = normalizeSpaces(
      load([c1, c2, c3][idx] || "")
        .root()
        .find("h1,h2,strong")
        .first()
        .text() || "",
    );
    const instruction = "Read the text and answer the questions.";
    return {
      id: "",
      title,
      content_html: [c1, c2, c3][idx] || "",
      instruction,
      question_groups: partGroups,
    } as OutputPart;
  });

  // Assign global sequential IDs: part → group → question
  parts.forEach((p) => (p.id = newId()));
  parts.forEach((p) => p.question_groups.forEach((g) => (g.id = newId())));
  // Do NOT renumber questions: keep original source numbers

  // Purify groups: remove internal keys like sectionHtml
  parts.forEach((p, idx) => {
    p.question_groups = p.question_groups.map((g) => {
      const { id, instruction, questionType, questionText, questions } =
        g as any;
      return {
        id,
        instruction,
        questionType,
        questionText,
        questions,
      } as OutputGroup;
    });
  });

  return {
    test_id: path.basename(path.dirname(fetchPath)).replace(/\/$/, ""),
    title: "",
    parts,
  };
}

function main(): void {
  const fetchPath = process.argv[2];
  if (!fetchPath) {
    console.error(
      "Usage: npx tsx scripts/generate-questions.ts reading/<vol>-<test>/fetch.html",
    );
    process.exit(1);
  }
  const html = readHtml(fetchPath);
  const $ = load(html);
  const out = buildOutput($, fetchPath);
  process.stdout.write(JSON.stringify(out, null, 2));
}

main();
