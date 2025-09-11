#!/usr/bin/env -S node

/**
 * Upload IELTS assets to Supabase Storage (bucket: ielts-tests).
 * Modes: reading (default) or listening (excludes fetch.html).
 * Usage: ts-node scripts/upload_tests.ts [reading|listening]
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".json":
      return "application/json";
    case ".mp3":
      return "audio/mpeg";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    default:
      return "application/octet-stream";
  }
}

function listJsonTargets(baseDir: string): string[] {
  const results: string[] = [];
  const stack: string[] = [baseDir];

  while (stack.length > 0) {
    const current = stack.pop() as string;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else if (entry.isFile()) {
        if (entry.name === "questions.json" || entry.name === "answers.json") {
          results.push(entryPath);
        }
      }
    }
  }

  return results.sort();
}

function listListeningTargets(baseDir: string): string[] {
  const results: string[] = [];
  const stack: string[] = [baseDir];

  while (stack.length > 0) {
    const current = stack.pop() as string;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else if (entry.isFile()) {
        if (entry.name !== "fetch.html") {
          results.push(entryPath);
        }
      }
    }
  }

  return results.sort();
}

async function existsInBucket(
  client: SupabaseClient,
  bucket: string,
  remotePath: string,
): Promise<boolean> {
  const idx = remotePath.lastIndexOf("/");
  const dir = idx >= 0 ? remotePath.slice(0, idx) : "";
  const name = remotePath.slice(idx + 1);
  const { data, error } = await client.storage.from(bucket).list(dir, {
    search: name,
    limit: 1000,
  });
  if (error) return false;
  return (data ?? []).some((it) => it.name === name);
}

async function uploadFile(
  client: SupabaseClient,
  bucket: string,
  localPath: string,
  remotePath: string,
): Promise<void> {
  const data = fs.readFileSync(localPath);
  const { error } = await client.storage.from(bucket).upload(remotePath, data, {
    contentType: getContentType(localPath),
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function main(): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error(
      "Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
    process.exit(1);
  }

  if (
    supabaseServiceRoleKey.split(".").length < 3 ||
    /publishable/i.test(supabaseServiceRoleKey)
  ) {
    console.error(
      "The provided SUPABASE_SERVICE_ROLE_KEY does not look like a service role JWT. " +
        "Please use the Service role key from Project Settings → API. Uploads require service role to bypass RLS.",
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const bucket = "ielts-tests";

  const repoRoot = process.cwd();
  const mode = (process.argv[2] || "reading").toLowerCase();

  let baseDir: string;
  let files: string[] = [];

  if (mode === "listening") {
    baseDir = path.join(repoRoot, "listening");
    if (!fs.existsSync(baseDir)) {
      console.error(`Listening directory not found: ${baseDir}`);
      process.exit(1);
    }
    files = listListeningTargets(baseDir);
    if (files.length === 0) {
      console.log(
        "No uploadable files found under listening/ (excluding fetch.html).",
      );
      return;
    }
  } else if (mode === "reading") {
    baseDir = path.join(repoRoot, "reading");
    if (!fs.existsSync(baseDir)) {
      console.error(`Reading directory not found: ${baseDir}`);
      process.exit(1);
    }
    files = listJsonTargets(baseDir);
    if (files.length === 0) {
      console.log(
        "No questions.json or answers.json files found under reading/.",
      );
      return;
    }
  } else {
    console.error(
      `Unknown mode: ${mode}. Use either 'reading' (default) or 'listening'.`,
    );
    process.exit(1);
  }

  let success = 0;
  let failed = 0;

  for (const localPath of files) {
    const relativePath = path.relative(repoRoot, localPath).replace(/\\/g, "/");
    const remotePath = relativePath;
    const contentType = getContentType(localPath);

    if (contentType === "audio/mpeg") {
      const already = await existsInBucket(supabase, bucket, remotePath);
      if (already) {
        console.log(
          `[SKIP] ${relativePath} already exists in ${bucket}/${remotePath}`,
        );
        success++;
        continue;
      }
    }

    try {
      await uploadFile(supabase, bucket, localPath, remotePath);
      success++;
      console.log(`[OK]   ${relativePath} -> ${bucket}/${remotePath}`);
    } catch (e: unknown) {
      failed++;
      const msg = e instanceof Error ? e.message : String(e);
      console.error(
        `[FAIL] ${relativePath} -> ${bucket}/${remotePath}: ${msg}`,
      );
    }
  }

  console.log(`\nUpload complete. Success: ${success}, Failed: ${failed}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("Unhandled error:", e);
  process.exit(1);
});
