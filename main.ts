// The Painfully Honest Out-of-Office — make.fun entry.
// Writes one brutally honest but still polite out-of-office auto-reply
// to /output/entry.txt (or to the path given as argv[2]).
//
// Gate: the output must be UTF-8 text of 1 to 200 characters, one line.
// This entry is 169 characters: it admits the sender is not reading
// email at all (the painful truth), promises the message is safe and
// will get a proper reply (the polite part), and keeps a warm tone a
// manager could forward without wincing.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I'm out of office this week and, to be honest, not reading email — your message is safe in my inbox, and I'll answer it properly when I'm back and rested enough to help.";

function main(): void {
  // Fail loudly instead of shipping an entry the gate would refuse.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
    throw new Error(`entry must be one line of 1-200 characters, got ${ENTRY.length}`);
  }
  const target = process.argv[2] ?? "/output/entry.txt";
  // argv[2] may be a file path or a directory; a directory means entry.txt inside it.
  const outPath = target.endsWith(".txt") ? target : join(target, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
}

main();
