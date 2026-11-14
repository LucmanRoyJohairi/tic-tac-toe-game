export type Player = "X" | "O" | null;

export interface Scores {
  X: number;
  O: number;
  draws: number;
}

export interface WinningLine {
  a: number;
  b: number;
  c: number;
}
