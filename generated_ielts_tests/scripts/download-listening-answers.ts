#!/usr/bin/env -S node --enable-source-maps
/**
 * Download IELTS Extremes listening answers page into listening/<id>/fetch_answers.html
 * Example URL pattern:
 *   https://ieltsextremes.com/cambridge-19-listening-test-4-answer/
 *   https://ieltsextremes.com/cambridge-17-listening-test-3-answers/
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/download-listening-answers.ts generated_ielts_tests/listening/19-4 [...]
 */
import fs from "fs";
import path from "path";

function parseIdFromDir(dir: string): { vol: string; test: string } {
  const base = path.basename(dir);
  const m = base.match(/^(\d+)[-_](\d+)$/);
  if (!m)
    throw new Error(`Cannot parse id from ${dir}. Expected <vol>-<test>.`);
  return { vol: m[1], test: m[2] };
}

async function tryDownload(urls: string[], dest: string): Promise<boolean> {
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) continue;
      const html = await res.text();
      await fs.promises.mkdir(path.dirname(dest), { recursive: true });
      await fs.promises.writeFile(dest, html, "utf8");
      process.stdout.write(`${dest} downloaded from ${url}.\n`);
      return true;
    } catch {}
  }
  return false;
}

function buildUrlCandidates(vol: string, test: string): string[] {
  const base = `https://ieltsextremes.com/cambridge-${vol}-listening-test-${test}-`;
  return [base + "answers/", base + "answer/"];
}

async function processDir(dir: string): Promise<void> {
  const { vol, test } = parseIdFromDir(dir);
  const urls = buildUrlCandidates(vol, test);
  const out = path.join(dir, "fetch_answers.html");
  const ok = await tryDownload(urls, out);
  if (!ok) {
    process.stderr.write(
      `[FAIL] ${dir}: none of URLs worked: ${urls.join(", ")}\n`,
    );
  }
}

async function main(): Promise<void> {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/download-listening-answers.ts generated_ielts_tests/listening/<vol>-<test> [...more]",
    );
    process.exit(1);
  }
  for (const t of targets) {
    const dir = path.resolve(t);
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      await processDir(dir);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
