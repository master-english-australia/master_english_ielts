#!/usr/bin/env -S node --enable-source-maps
/**
 * Generate listening answers.json from listening/<vol>-<test>/fetch_answers.html
 * Heuristic order:
 * 1) Detect pairs like "N & M" (also &amp; or 'and'), capture letters (A–E) listed immediately after (e.g., after 'IN EITHER ORDER'), assign to both N and M
 * 2) For remaining numbers, find patterns ">N.", or boundary "N." and capture text until next '<'
 * 3) Finally, fill any remaining blanks from <ol><li> blocks, using <ol start="N"> to map numbers sequentially
 * Additionally, if a captured answer contains slashes (e.g., "photo card / photo cards"), split into an array.
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/generate-listening-answers.ts generated_ielts_tests/listening/19-4
 *   npx --yes tsx generated_ielts_tests/scripts/generate-listening-answers.ts generated_ielts_tests/listening/19-4/fetch_answers.html
 */

import { load } from "cheerio";
import fs from "fs";
import path from "path";

function resolveDir(arg: string): { dir: string } {
  const abs = path.resolve(arg);
  const dir = fs.statSync(abs).isDirectory() ? abs : path.dirname(abs);
  return { dir };
}

function clean(s: string): string {
  return s
    .replace(/[\u00A0\u200B]/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toArrayOptions(raw: string): string[] {
  const s = clean(raw);
  if (!s) return [];
  const parts = s
    .split(/\s*\/\s*/)
    .map((p) => clean(p))
    .filter(Boolean);
  if (parts.length >= 2) {
    const seen = new Set<string>();
    const arr: string[] = [];
    for (const p of parts)
      if (!seen.has(p.toLowerCase())) {
        seen.add(p.toLowerCase());
        arr.push(p);
      }
    return arr;
  }
  return [s];
}

function findNextQuestionIndex(html: string, fromIdx: number): number {
  const re = />\s*(\d{1,2})\s*(?:[.&]|&|&amp;|and)/gi;
  re.lastIndex = fromIdx;
  const m = re.exec(html);
  return m ? m.index : -1;
}

function extractFollowingLetters(html: string, startIdx: number): string[] {
  const nextIdx = findNextQuestionIndex(html, startIdx);
  const end =
    nextIdx > startIdx ? nextIdx : Math.min(html.length, startIdx + 800);
  const slice = html.slice(startIdx, end);
  const letters: string[] = [];
  const re = /([A-E])\s*(?=<)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(slice))) {
    const l = m[1].toUpperCase();
    if (!letters.includes(l)) letters.push(l);
  }
  return letters;
}

function extractPair(html: string, a: number, b: number): string[] | undefined {
  const sep = "(?:&|&amp;|and)";
  const tail = "\\s*[:.)-]?\\s*([^<]+)"; // capture until next tag
  const res: RegExp[] = [
    new RegExp(`>${a}\\s*${sep}\\s*${b}${tail}`, "i"),
    new RegExp(`(^|[^\\d])${a}\\s*${sep}\\s*${b}${tail}`, "i"),
  ];
  for (const re of res) {
    const m = html.match(re);
    if (m) {
      const afterIdx = (m.index ?? 0) + m[0].length;
      const letters = extractFollowingLetters(html, afterIdx);
      if (letters.length >= 2) return letters;
      const grp = m[m.length - 1];
      const arr = toArrayOptions(grp);
      if (arr.length) return arr;
    }
  }
  return undefined;
}

function extractSingle(html: string, n: number): string[] | undefined {
  const patterns: RegExp[] = [
    // >13. answer
    new RegExp(`>${n}\\.\\s*([^<]+)`, "i"),
    // >13.</strong> answer
    new RegExp(`>${n}\\\.<\\/[^>]+>\\s*([^<]+)`, "i"),
    // boundary13. answer (require at least one space after 'N.')
    new RegExp(`(^|[^\\d])${n}\\.\\s+([^<]+)`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) {
      const grp = m[m.length - 1];
      const arr = toArrayOptions(grp);
      if (arr.length) return arr;
    }
  }
  return undefined;
}

function fillFromOrderedLists(
  html: string,
  out: Record<string, string[]>,
  filled: Set<number>,
): void {
  const $ = load(html);
  $("ol").each((_, ol) => {
    const startAttr = ($(ol).attr("start") || "1").trim();
    const startNum = parseInt(startAttr, 10);
    const base = Number.isFinite(startNum) && startNum >= 1 ? startNum : 1;
    $(ol)
      .find("> li")
      .each((idx, li) => {
        const qn = base + idx;
        if (qn < 1 || qn > 40) return;
        if (filled.has(qn)) return;
        const text = ($(li).text() || "").trim();
        const arr = toArrayOptions(text);
        if (arr.length) {
          out[String(qn)] = arr;
          filled.add(qn);
        }
      });
  });
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/generate-listening-answers.ts generated_ielts_tests/listening/<vol>-<test>[\/fetch_answers.html]",
    );
    process.exit(1);
  }

  const { dir } = resolveDir(arg);
  const htmlPath = path.join(dir, "fetch_answers.html");
  if (!fs.existsSync(htmlPath)) {
    console.error(`fetch_answers.html not found: ${htmlPath}`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, "utf8");

  const out: Record<string, string[]> = {};
  const filled = new Set<number>();

  // First pass: pairs N & N+1
  for (let n = 1; n <= 39; n += 1) {
    if (filled.has(n) || filled.has(n + 1)) continue;
    const ansArr = extractPair(html, n, n + 1);
    if (ansArr && ansArr.length) {
      out[String(n)] = ansArr;
      out[String(n + 1)] = ansArr;
      filled.add(n);
      filled.add(n + 1);
    }
  }

  // Also consider pairs (N-1 & N)
  for (let n = 1; n <= 40; n += 1) {
    if (filled.has(n)) continue;
    if (n > 1 && !filled.has(n - 1)) {
      const ansArr = extractPair(html, n - 1, n);
      if (ansArr && ansArr.length) {
        out[String(n - 1)] = ansArr;
        out[String(n)] = ansArr;
        filled.add(n - 1);
        filled.add(n);
        continue;
      }
    }
  }

  // Second pass: singles
  for (let n = 1; n <= 40; n += 1) {
    if (filled.has(n)) continue;
    const ansArr = extractSingle(html, n);
    if (ansArr && ansArr.length) {
      out[String(n)] = ansArr;
      filled.add(n);
    }
  }

  // Final pass: ordered lists mapping
  fillFromOrderedLists(html, out, filled);

  // Ensure all keys exist
  for (let n = 1; n <= 40; n += 1) if (!(String(n) in out)) out[String(n)] = [];

  const outPath = path.join(dir, "answers.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  process.stdout.write(`${outPath} written.\n`);
}

main();
