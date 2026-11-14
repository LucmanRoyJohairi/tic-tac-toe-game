import { X, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Player, WinningLine } from "./types";

interface GameBoardProps {
  board: Player[];
  isXNext: boolean;
  winningLine: WinningLine | null;
  disabled: boolean;
  onSquareClick: (index: number) => void;
}

export function GameBoard({
  board,
  isXNext,
  winningLine,
  disabled,
  onSquareClick,
}: GameBoardProps) {
  const winningIndices = winningLine
    ? [winningLine.a, winningLine.b, winningLine.c]
    : [];

  return (
    <Card className="p-5 shadow-md border-slate-200/80 bg-white/90 backdrop-blur-xs rounded-3xl">
      <CardContent className="p-0 grid grid-cols-3 gap-3.5">
        {board.map((value, index) => {
          const isWinningSquare = winningIndices.includes(index);
          const isEmptyAndPlayable = !value && !disabled;

          return (
            <button
              key={index}
              onClick={() => onSquareClick(index)}
              disabled={!isEmptyAndPlayable}
              className={`group relative h-24 sm:h-28 w-full rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
                isWinningSquare
                  ? value === "X"
                    ? "bg-blue-50 border-blue-500 shadow-md shadow-blue-500/15 scale-[1.03]"
                    : "bg-red-50 border-red-500 shadow-md shadow-red-500/15 scale-[1.03]"
                  : value
                  ? "bg-slate-50/70 border-slate-200/90"
                  : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-xs active:scale-95 cursor-pointer"
              } disabled:cursor-default`}
            >
              {/* Placed Mark */}
              {value === "X" && (
                <X
                  className={`h-12 w-12 text-blue-600 stroke-[3.2] transition-transform duration-200 ${
                    isWinningSquare ? "scale-110" : "animate-in zoom-in-75 duration-150"
                  }`}
                />
              )}
              {value === "O" && (
                <Circle
                  className={`h-11 w-11 text-red-600 stroke-[3.2] transition-transform duration-200 ${
                    isWinningSquare ? "scale-110" : "animate-in zoom-in-75 duration-150"
                  }`}
                />
              )}

              {/* Ghost Hover Preview */}
              {isEmptyAndPlayable && (
                <span className="opacity-0 group-hover:opacity-25 transition-opacity duration-150">
                  {isXNext ? (
                    <X className="h-11 w-11 text-blue-600 stroke-[3]" />
                  ) : (
                    <Circle className="h-10 w-10 text-red-600 stroke-[3]" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
