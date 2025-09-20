#!/usr/bin/env -S node --enable-source-maps
/**
 * Download IELTS Writing pages into writing/<id>/fetch.html
 * Supports variants:
 *  - general (default): Engnovate General Training URL
 *  - academic: try likely Academic URL patterns; allow --url override
 * Usage:
 *   npx --yes tsx generated_ielts_tests/scripts/download-writing-fetch.ts [--variant=general|academic] [--url=<override>] writing/<vol>-<test> [...]
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

function buildUrlCandidates(
  vol: string,
  test: string,
  variant: "general" | "academic",
  override?: string,
): string[] {
  if (override) return [override];
  if (variant === "general") {
    return [
      `https://engnovate.com/ielts-writing-tests/cambridge-ielts-${vol}-general-training-writing-test-${test}/`,
    ];
  }
  // Academic guesses; pass --url to override if needed
  return [
    `https://engnovate.com/ielts-writing-tests/cambridge-ielts-${vol}-academic-writing-test-${test}/`,
    `https://engnovate.com/ielts-writing-tests/cambridge-ielts-${vol}-writing-test-${test}/`,
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
  const out = path.join(dir, "fetch.html");
  try {
    let ok = false;
    for (const u of urls) {
      try {
        await download(u, out);
        process.stdout.write(`${out} downloaded from ${u}.\n`);
        ok = true;
        break;
      } catch {}
    }
    if (!ok) throw new Error(`None of URL candidates worked.`);
  } catch (e: any) {
    process.stderr.write(
      `[FAIL] ${dir}: variant=${variant}. Tried: ${urls.join(", ")}. Error: ${e?.message || e}\n`,
    );
  }
}

async function main(): Promise<void> {
  const { variant, url, targets } = parseArgs(process.argv.slice(2));
  if (targets.length === 0) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/download-writing-fetch.ts [--variant=general|academic] [--url=<override>] writing/<vol>-<test> [...more]",
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
