import type { Puzzle } from "./types";

export const puzzle: Puzzle = {
  title: "The Monday Mini",
  issue: "No. 12",
  author: "Edited by Ada Quill",
  date: "Mon, Nov 30, 2026",
  grid: ["ACE##", "GODS#", "ORGAN", "#DEMO", "##SET"],
  clues: {
    across: {
      1: "Serve nobody returns",
      4: "Residents of Olympus",
      6: "Instrument with pipes",
      8: "Rough recording before the album",
      9: "Where the film crew works",
    },
    down: {
      1: "Long ___ and far away",
      2: "Charger cable",
      3: "Puzzle pieces you sort first",
      5: "Not different",
      7: "Knot's sound-alike",
    },
  },
  solveUrl: "https://mini.example/monday/12",
};
