import { X, Circle, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Scores } from "./types";

interface ScoreBoardProps {
  scores: Scores;
  playerXName: string;
  playerOName: string;
  isXNext: boolean;
  gameOver: boolean;
}

export function ScoreBoard({
  scores,
  playerXName,
  playerOName,
  isXNext,
  gameOver,
}: ScoreBoardProps) {
  return (
    <Card className="shadow-sm border-slate-200/80 bg-white rounded-3xl">
      <CardContent className="p-5 text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Score Board
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Player X Score */}
          <div
            className={`rounded-2xl p-3 border transition-all ${
              !gameOver && isXNext
                ? "bg-blue-50/80 border-blue-300 shadow-xs"
                : "bg-blue-50/30 border-blue-100"
            }`}
          >
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white mb-1.5">
              <X className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-semibold text-blue-700 truncate">
              {playerXName}
            </p>
            <p className="text-2xl font-extrabold text-blue-600 mt-0.5">
              {scores.X}
            </p>
          </div>

          {/* Draws Score */}
          <div className="rounded-2xl p-3 bg-amber-50/40 border border-amber-100">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white mb-1.5">
              <Minus className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-semibold text-amber-700">Draws</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-0.5">
              {scores.draws}
            </p>
          </div>

          {/* Player O Score */}
          <div
            className={`rounded-2xl p-3 border transition-all ${
              !gameOver && !isXNext
                ? "bg-red-50/80 border-red-300 shadow-xs"
                : "bg-red-50/30 border-red-100"
            }`}
          >
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-white mb-1.5">
              <Circle className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-semibold text-red-700 truncate">
              {playerOName}
            </p>
            <p className="text-2xl font-extrabold text-red-600 mt-0.5">
              {scores.O}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
