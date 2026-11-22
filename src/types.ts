/** "#" is a block; any letter is an answer square. Rows must be the same length. */
export type Grid = string[];

export interface Clue {
  number: number;
  clue: string;
  answer: string;
}

export interface Puzzle {
  title: string;
  issue: string;
  author: string;
  date: string;
  grid: Grid;
  clues: { across: Record<number, string>; down: Record<number, string> };
  solveUrl: string;
  /** A line or two from the editor, at the foot of the email and the answer key. */
  note: string;
}

export interface Square {
  row: number;
  col: number;
  block: boolean;
  letter: string;
  number?: number;
}
