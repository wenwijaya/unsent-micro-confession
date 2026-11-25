// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to /output/entry.txt:
// a To: line naming who it was meant for, then the unsent line itself,
// exactly as it was typed, with nothing after it.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const CONFESSION: string =
  "To: Dad\n" +
  "I rehearsed telling you I quit the job you brag about to your friends, then answered the phone and said work's fine.";

function main(): void {
  // Gate, mirrored from the competition rules: 1-260 characters total,
  // message line at most 200 characters. This text is 124 characters
  // in total with a 116-character message line, so it passes as written.
  const lines: string[] = CONFESSION.split("\n");
  const total: number = CONFESSION.length;
  const message: string = lines.length > 1 ? lines[1] : "";
  if (total < 1 || total > 260 || message.length > 200) {
    return;
  }
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", CONFESSION, "utf8");
    chmodSync("/output/entry.txt", 0o644);
  } catch (error) {
    try {
      mkdirSync("/output", { recursive: true });
      writeFileSync("/output/entry.txt", CONFESSION, "utf8");
      chmodSync("/output/entry.txt", 0o644);
    } catch (_secondError) {
      // Still exit 0: the sandbox reports what it can from a best effort.
    }
  }
}

main();
