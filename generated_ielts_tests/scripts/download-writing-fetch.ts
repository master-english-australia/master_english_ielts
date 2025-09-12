#!/usr/bin/env -S node --enable-source-maps
/**
 * Download Engnovate IELTS General Training Writing pages into writing/<id>/fetch.html
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/download-writing-fetch.ts writing/19-4 [writing/18-4 ...]
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

async function download(url: string, dest: string): Promise<void> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const html = await res.text();
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await fs.promises.writeFile(dest, html, "utf8");
}

function buildUrl(vol: string, test: string): string {
  return `https://engnovate.com/ielts-writing-tests/cambridge-ielts-${vol}-general-training-writing-test-${test}/`;
}

async function processDir(dir: string): Promise<void> {
  const { vol, test } = parseIdFromDir(dir);
  const url = buildUrl(vol, test);
  const out = path.join(dir, "fetch.html");
  try {
    await download(url, out);
    process.stdout.write(`${out} downloaded.\n`);
  } catch (e: any) {
    process.stderr.write(`[FAIL] ${dir}: ${url} -> ${e?.message || e}\n`);
  }
}

async function main(): Promise<void> {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/download-writing-fetch.ts writing/<vol>-<test> [...more]",
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
