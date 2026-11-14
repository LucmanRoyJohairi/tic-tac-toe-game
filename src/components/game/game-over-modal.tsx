"use client";

import { Trophy, Handshake, RotateCcw, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player, Scores } from "./types";

interface GameOverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  winner: Player;
  isDraw: boolean;
  playerXName: string;
  playerOName: string;
  scores: Scores;
  onNewRound: () => void;
  onChangePlayers: () => void;
}

export function GameOverModal({
  open,
  onOpenChange,
  winner,
  isDraw,
  playerXName,
  playerOName,
  scores,
  onNewRound,
  onChangePlayers,
}: GameOverModalProps) {
  if (!winner && !isDraw) return null;

  const winnerName = winner === "X" ? playerXName : playerOName;

  // Dynamic theme colors based on outcome
  const bannerGradient =
    winner === "X"
      ? "from-blue-50 via-indigo-50/60 to-slate-50"
      : winner === "O"
      ? "from-red-50 via-rose-50/60 to-slate-50"
      : "from-amber-50 via-orange-50/50 to-slate-50";

  const iconBg =
    winner === "X"
      ? "bg-blue-600 shadow-blue-500/25"
      : winner === "O"
      ? "bg-red-600 shadow-red-500/25"
      : "bg-amber-500 shadow-amber-500/25";

  const buttonGradient =
    winner === "X"
      ? "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
      : winner === "O"
      ? "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/20"
      : "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl border-slate-200/80 p-0 overflow-hidden shadow-xl">
        {/* Top Celebratory Banner */}
        <div
          className={`bg-gradient-to-br ${bannerGradient} pt-8 pb-6 px-6 border-b border-slate-100 text-center`}
        >
          <div
            className={`mx-auto mb-4 h-16 w-16 rounded-2xl ${iconBg} text-white flex items-center justify-center shadow-lg animate-in zoom-in-75 duration-300`}
          >
            {winner ? (
              <Trophy className="h-8 w-8" />
            ) : (
              <Handshake className="h-8 w-8" />
            )}
          </div>

          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {winner ? `${winnerName} Wins!` : "It's a Draw!"}
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              {winner
                ? "Great match! Ready to run it back for another round?"
                : "Evenly matched! Break the tie in the next round."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Mini Score Summary */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-2xl bg-blue-50/60 border border-blue-100 p-3">
              <p className="text-xs font-semibold text-blue-700 truncate">
                {playerXName}
              </p>
              <p className="text-xl font-extrabold text-blue-600 mt-0.5">
                {scores.X}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-3">
              <p className="text-xs font-semibold text-amber-700">Draws</p>
              <p className="text-xl font-extrabold text-amber-600 mt-0.5">
                {scores.draws}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50/60 border border-red-100 p-3">
              <p className="text-xs font-semibold text-red-700 truncate">
                {playerOName}
              </p>
              <p className="text-xl font-extrabold text-red-600 mt-0.5">
                {scores.O}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="px-6 pb-6 pt-0 bg-white flex flex-col sm:flex-col gap-2.5">
          <Button
            onClick={onNewRound}
            className={`w-full h-12 rounded-xl bg-gradient-to-r ${buttonGradient} text-white font-semibold text-base shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2`}
          >
            <RotateCcw className="h-4 w-4" />
            Play Next Round
            <Sparkles className="h-4 w-4 opacity-80" />
          </Button>

          <Button
            onClick={onChangePlayers}
            variant="ghost"
            className="w-full h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium flex items-center justify-center gap-2"
          >
            <Users className="h-4 w-4" />
            Reset Scores & Change Players
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
