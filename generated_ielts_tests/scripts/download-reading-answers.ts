#!/usr/bin/env -S node --enable-source-maps
/**
 * Download IELTS reading answers page into reading/<id>/fetch_answers.html
 * Supports variants:
 *  - general (default)
 *  - academic (use --variant=academic or infer from path containing "/academic/")
 * You can force a specific URL with --url=<override>.
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/download-reading-answers.ts [--variant=general|academic] [--url=<override>] generated_ielts_tests/reading/<vol>-<test> [...]
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

function inferVariantFromPath(dir: string): "general" | "academic" | undefined {
  const norm = dir.replace(/\\/g, "/");
  if (/\bacademic\b/.test(norm)) return "academic";
  if (/\bgeneral\b/.test(norm)) return "general";
  return undefined;
}

function parseArgs(argv: string[]): {
  variant?: "general" | "academic";
  url?: string;
  targets: string[];
} {
  let variant: "general" | "academic" | undefined;
  let url: string | undefined;
  const targets: string[] = [];
  for (const a of argv) {
    if (a.startsWith("--variant=")) {
      const v = a.split("=")[1]?.trim().toLowerCase();
      if (v === "general" || v === "academic") variant = v;
    } else if (a.startsWith("--url=")) {
      url = a.split("=")[1]?.trim();
    } else {
      targets.push(a);
    }
  }
  return { variant, url, targets };
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

function buildUrlCandidates(
  vol: string,
  test: string,
  variant: "general" | "academic",
  override?: string,
): string[] {
  if (override) return [override];
  if (variant === "general") {
    return [
      `https://ieltsextremes.com/ielts-general-training-${vol}-test-${test}-reading-answers/`,
    ];
  }
  // Academic guesses; pass --url to override if needed

  return [
    `https://ieltsextremes.com/ielts-academic-${vol}-test-${test}-reading-answers/`,
    `https://ieltsextremes.com/cambridge-${vol}-academic-reading-test-${test}-answers/`,
    `https://ieltsextremes.com/cambridge-${vol}-reading-test-${test}-answers/`,
  ];
}

async function processDir(
  dir: string,
  variantHint?: "general" | "academic",
  overrideUrl?: string,
): Promise<void> {
  const { vol, test } = parseIdFromDir(dir);
  const inferred = inferVariantFromPath(dir);
  const variant = variantHint || inferred || "general";
  const urls = buildUrlCandidates(vol, test, variant, overrideUrl);
  const out = path.join(dir, "fetch_answers.html");
  const ok = await tryDownload(urls, out);
  if (!ok)
    process.stderr.write(
      `[FAIL] ${dir}: none of URLs worked (variant=${variant}). Tried: ${urls.join(", ")}\n`,
    );
}

async function main(): Promise<void> {
  const { variant, url, targets } = parseArgs(process.argv.slice(2));
  if (targets.length === 0) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/download-reading-answers.ts [--variant=general|academic] [--url=<override>] generated_ielts_tests/reading/<vol>-<test> [...more]",
    );
    process.exit(1);
  }
  for (const t of targets) {
    const dir = path.resolve(t);
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      await processDir(dir, variant, url);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
