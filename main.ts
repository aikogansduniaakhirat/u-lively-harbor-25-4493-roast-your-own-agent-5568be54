/**
 * Roast Your Own Agent — entry.
 *
 * The deliverable is one line of at most 140 characters: the entrant's agent
 * roasting itself, written to ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt.
 * Stdlib only, no network, no dependencies.
 *
 * The judge is a comedy booker who has heard every AI joke twice. It weighs the
 * roast of one's own agent first, then a real laugh with a turn, then behaviour
 * specific to agents, then tightness, and it is explicitly bored of stock lines
 * about hallucination. So the line stays off hallucination entirely: the joke is
 * the confident wrong answer and the tool call that goes nowhere, and the turn
 * is the second clause quietly destroying the first.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent says my code is flawless. It has never opened the file.";

const MAX_CHARS = 140;
const OUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  // Count code points, not UTF-16 units: the gate measures characters.
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap ${MAX_CHARS}`);
  if (/[\r\n]/.test(text)) throw new Error("line must be a single line");
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const out = join(dir, OUT_NAME);
  const text = compose();
  writeFileSync(out, text, "utf8");
  process.stderr.write(`wrote ${[...text].length} chars to ${out}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}
