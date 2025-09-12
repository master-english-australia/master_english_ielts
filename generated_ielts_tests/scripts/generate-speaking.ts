#!/usr/bin/env -S node --enable-source-maps
/**
 * Generate speaking questions.json from speaking/<vol>-<test>/fetch.html
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/generate-speaking.ts generated_ielts_tests/speaking/18-4
 *   npx --yes tsx generated_ielts_tests/scripts/generate-speaking.ts generated_ielts_tests/speaking/18-4/fetch.html
 */

import { load } from "cheerio";
import fs from "fs";
import path from "path";

interface OutputQuestion {
  id: number;
  text: string;
}
interface OutputPart {
  id: number;
  questions: OutputQuestion[];
}
interface OutputDoc {
  parts: OutputPart[];
}

function resolveDir(arg: string): { dir: string } {
  const abs = path.resolve(arg);
  const dir = fs.statSync(abs).isDirectory() ? abs : path.dirname(abs);
  return { dir };
}

function normalize(s: string): string {
  return s
    .replace(/[\u00A0\u200B]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/generate-speaking.ts generated_ielts_tests/speaking/<vol>-<test>[\/fetch.html]",
    );
    process.exit(1);
  }

  const { dir } = resolveDir(arg);
  const htmlPath = path.join(dir, "fetch.html");
  if (!fs.existsSync(htmlPath)) {
    console.error(`fetch.html not found: ${htmlPath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = load(html);

  const partsMap: Record<number, OutputQuestion[]> = { 1: [], 2: [], 3: [] };
  let nextId = 1;

  $(".ielts-speaking-question").each((_, el) => {
    const type = ($(el).attr("data-question-type") || "").trim().toLowerCase();
    const partId =
      type === "part_one"
        ? 1
        : type === "part_two"
          ? 2
          : type === "part_three"
            ? 3
            : 0;
    if (!partId) return;
    const text = normalize($(el).find(".question-text p").first().text() || "");
    if (!text) return;
    partsMap[partId].push({ id: nextId++, text });
  });

  const parts: OutputPart[] = [1, 2, 3].map((pid) => ({
    id: pid,
    questions: partsMap[pid],
  }));
  const out: OutputDoc = { parts };

  const outPath = path.join(dir, "questions.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  process.stdout.write(`${outPath} written.\n`);
}

main();
