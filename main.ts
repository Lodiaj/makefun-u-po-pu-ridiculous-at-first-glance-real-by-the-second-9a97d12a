import { writeFileSync, mkdirSync } from "node:fs";

const PITCH =
  "We rent out goats to mow your lawn: our herd has cleared 300 acres this year, costs less than a landscaping crew, and every review is five stars.";

function validatePitch(text: string): string[] {
  const problems: string[] = [];
  if (text.length === 0) problems.push("empty");
  if (text.length >= 200)
    problems.push("too long: " + text.length + " chars (max 199)");
  if (text.includes("\n")) problems.push("must be a single line");
  if (text.trim() !== text) problems.push("leading/trailing whitespace");
  if (text.split(/\s+/).length < 3) problems.push("too few words");
  if (!text.endsWith(".")) problems.push("must end with a full stop");
  if (text.includes("  ")) problems.push("double space");
  for (const ch of text) {
    if (ch.charCodeAt(0) < 32 || ch.charCodeAt(0) > 126) {
      problems.push("non-printable-ASCII character");
      break;
    }
  }
  return problems;
}

const problems = validatePitch(PITCH);
if (problems.length > 0) {
  console.error("invalid pitch: " + problems.join("; "));
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");
console.log(PITCH);
