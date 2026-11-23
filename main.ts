// Dad Joke Showdown — golden-condor-22
// Writes one original dad joke to /output/entry.txt, deterministically.
// Stdlib only: no network, no randomness, no clock.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  'My dad treats the thermostat like a safe combination. He nudges it one degree, waits, and whispers, "Almost cracked it."';

// The gate counts characters: the entry must be 1-200 UTF-8 characters.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} chars, must be 1-200`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read back what we wrote and verify it byte-for-byte, so a silent
// partial write can never pass as a valid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("read-back mismatch: /output/entry.txt does not match the joke");
}
console.log(`wrote ${written.length} chars to /output/entry.txt`);
