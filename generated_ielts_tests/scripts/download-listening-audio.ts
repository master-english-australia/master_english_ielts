#!/usr/bin/env -S node --enable-source-maps
/**
 * Download 4 listening audio files per folder by parsing fetch.html <audio><source src=...> tags.
 * Usage:
 *   npx --yes tsx scripts/download-listening-audio.ts listening/19-4
 *   npx --yes tsx scripts/download-listening-audio.ts listening/* (via npm script)
 */

import { load } from "cheerio";
import fs from "fs";
import path from "path";

async function download(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to download ${url}: ${res.status} ${res.statusText}`,
    );
  }
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(dest, buf);
}

function parseAudioUrls(htmlPath: string): string[] {
  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = load(html);
  const urls: string[] = [];
  $("audio source[src]").each((_, el) => {
    const src = $(el).attr("src")?.trim();
    if (src && /^https?:\/\//i.test(src)) urls.push(src);
  });
  // Some pages might have duplicate sources; keep first 4 unique
  const uniq: string[] = [];
  for (const u of urls) if (!uniq.includes(u)) uniq.push(u);
  return uniq.slice(0, 4);
}

async function processFolder(folder: string): Promise<void> {
  const htmlPath = path.join(folder, "fetch.html");
  if (!fs.existsSync(htmlPath)) return;
  const urls = parseAudioUrls(htmlPath);
  for (let i = 0; i < urls.length; i += 1) {
    const partIdx = i + 1;
    const out = path.join(folder, `part${partIdx}.mp3`);
    if (fs.existsSync(out)) {
      process.stdout.write(`${out} already exists. Skipping.\n`);
      continue;
    }
    await download(urls[i], out);
    process.stdout.write(`${out} downloaded.\n`);
  }
}

async function main(): Promise<void> {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error(
      "Usage: npx --yes tsx scripts/download-listening-audio.ts <listening/<id>> [...more]",
    );
    process.exit(1);
  }
  for (const t of targets) {
    const stat = fs.existsSync(t) ? fs.statSync(t) : undefined;
    if (stat?.isDirectory()) {
      await processFolder(t);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
