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
  followups?: string[];
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

function splitByBrToTextsUsingCheerio(html: string, $: any): string[] {
  return html
    .split(/<br\s*\/?\s*>/gi)
    .map((segment) => normalize($("<div>").html(segment).text()))
    .filter((t) => !!t);
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
    let text = "";
    let followups: string[] | undefined;
    if (partId === 2) {
      const container = $(el).find(".question-text").first();
      text = normalize(container.find("p").first().text() || "");

      // Extract followups appearing after the "You should say:" marker
      const paras = container.find("p").toArray();
      let markerIdx = -1;
      for (let i = 0; i < paras.length; i++) {
        const pText = normalize($(paras[i]).text() || "").toLowerCase();
        if (pText.startsWith("you should say")) {
          markerIdx = i;
          break;
        }
      }

      const collected: string[] = [];
      if (markerIdx >= 0) {
        for (let j = markerIdx + 1; j < paras.length; j++) {
          const p = $(paras[j]);
          const html = p.html() || "";
          if (/<br\s*\/?\s*>/i.test(html)) {
            collected.push(...splitByBrToTextsUsingCheerio(html, $));
          } else {
            const t = normalize(p.text() || "");
            if (t) collected.push(t);
          }
        }
      }

      // Also support list formats, if present
      container.find("li").each((__, li) => {
        const t = normalize($(li).text() || "");
        if (t) collected.push(t);
      });

      if (collected.length) {
        const seen = new Set<string>();
        followups = collected.filter((t) => {
          if (seen.has(t)) return false;
          seen.add(t);
          return true;
        });
      }
    } else {
      text = normalize($(el).find(".question-text p").first().text() || "");
    }
    if (!text) return;
    const q =
      followups && followups.length
        ? { id: nextId++, text, followups }
        : { id: nextId++, text };
    partsMap[partId].push(q);
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
