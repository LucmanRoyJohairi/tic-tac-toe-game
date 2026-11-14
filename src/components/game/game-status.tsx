import { Trophy, Handshake, X, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Player } from "./types";

interface GameStatusProps {
  winner: Player;
  isDraw: boolean;
  isXNext: boolean;
  playerXName: string;
  playerOName: string;
}

export function GameStatus({
  winner,
  isDraw,
  isXNext,
  playerXName,
  playerOName,
}: GameStatusProps) {
  const winnerName = winner === "X" ? playerXName : playerOName;
  const currentTurnName = isXNext ? playerXName : playerOName;

  return (
    <Card
      className={`shadow-sm rounded-3xl border transition-colors duration-300 ${
        winner
          ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
          : isDraw
          ? "bg-amber-50/70 border-amber-200"
          : isXNext
          ? "bg-blue-50/50 border-blue-200/80"
          : "bg-red-50/50 border-red-200/80"
      }`}
    >
      <CardContent className="py-6 px-5 flex items-center justify-center gap-3 text-center">
        {winner ? (
          <>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Victory!
              </p>
              <p className="text-xl font-extrabold text-slate-900">
                {winnerName} wins!
              </p>
            </div>
          </>
        ) : isDraw ? (
          <>
            <div className="h-10 w-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <Handshake className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Tie Match
              </p>
              <p className="text-xl font-extrabold text-slate-900">
                It&apos;s a draw!
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`h-10 w-10 rounded-2xl text-white flex items-center justify-center shadow-xs shrink-0 transition-colors ${
                isXNext ? "bg-blue-600" : "bg-red-600"
              }`}
            >
              {isXNext ? (
                <X className="h-5 w-5 stroke-[3]" />
              ) : (
                <Circle className="h-5 w-5 stroke-[3]" />
              )}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Turn
              </p>
              <p
                className={`text-xl font-extrabold ${
                  isXNext ? "text-blue-600" : "text-red-600"
                }`}
              >
                {currentTurnName}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
