import { load } from "cheerio";
import type { AnyNode } from "domhandler";
import fs from "fs";
import path from "path";

// Step 1: Define minimal output shape for writing
export type OutputDoc = { part1: any; part2: any };

function resolveDir(arg: string): { dir: string } {
  const abs = path.resolve(arg);
  const dir = fs.statSync(abs).isDirectory() ? abs : path.dirname(abs);
  return { dir };
}

function outerHTML($: any, el: AnyNode): string {
  const $wrap = load("<root></root>");
  $wrap("root").append($(el as any).clone());
  return $wrap("root").html() ?? "";
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: npx --yes tsx generated_ielts_tests/scripts/generate-writing.ts writing/<vol>-<test>/fetch.html | writing/<vol>-<test>",
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

  // Step 2: Extract two .ielts-writing-question blocks in order
  let nodes = $(".ielts-writing-question").toArray() as unknown as AnyNode[];
  if (nodes.length !== 2) {
    // Fallback: get explicitly from sections 1 and 2
    const n1 = $(
      "#ielts-writing-question-section-1 .ielts-writing-question",
    ).first();
    const n2 = $(
      "#ielts-writing-question-section-2 .ielts-writing-question",
    ).first();
    nodes = [n1.get(0), n2.get(0)].filter(Boolean) as unknown as AnyNode[];
  }
  if (nodes.length !== 2) {
    console.error(
      `Expected 2 .ielts-writing-question blocks, found ${nodes.length}.`,
    );
    process.exit(1);
  }

  const part1Html = outerHTML($, nodes[0]);
  const part2Html = outerHTML($, nodes[1]);

  const out: OutputDoc = {
    part1: { promptContent: part1Html },
    part2: { promptContent: part2Html },
  };

  const outPath = path.join(dir, "questions.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  process.stdout.write(`${outPath} written.\n`);
}

main();
