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
}

export interface Square {
  row: number;
  col: number;
  block: boolean;
  letter: string;
  number?: number;
}
