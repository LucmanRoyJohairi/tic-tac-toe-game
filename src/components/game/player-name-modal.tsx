"use client";

import { useState } from "react";
import { X, Circle, Swords, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlayerNameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartGame: (playerX: string, playerO: string) => void;
}

export function PlayerNameModal({
  open,
  onOpenChange,
  onStartGame,
}: PlayerNameModalProps) {
  const [nameInputX, setNameInputX] = useState("");
  const [nameInputO, setNameInputO] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(
      nameInputX.trim() || "Player X",
      nameInputO.trim() || "Player O"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl border-slate-200/80 p-0 overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit}>
          {/* Top Decorative Banner */}
          <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-red-50 pt-8 pb-6 px-6 border-b border-slate-100 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-4 bg-white px-4 py-2 rounded-2xl shadow-xs border border-slate-200/70">
              <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <X className="h-5 w-5 stroke-[3]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                VS
              </span>
              <div className="h-9 w-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Circle className="h-5 w-5 stroke-[3]" />
              </div>
            </div>

            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
                Ready to Play?
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-sm">
                Enter your names to customize the scoreboard, or jump right in!
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Player Input Cards */}
          <div className="grid gap-4 p-6 bg-white">
            {/* Player X Card */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-3.5 transition-colors focus-within:border-blue-300 focus-within:bg-blue-50/70">
              <Label
                htmlFor="playerX"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white">
                  <X className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                Player 1 (X)
              </Label>
              <Input
                id="playerX"
                placeholder="Enter name (e.g. John)"
                value={nameInputX}
                onChange={(e) => setNameInputX(e.target.value)}
                className="bg-white border-blue-200/80 h-10 rounded-xl focus-visible:ring-blue-500 font-medium text-slate-800"
              />
            </div>

            {/* Player O Card */}
            <div className="rounded-2xl border border-red-100 bg-red-50/40 p-3.5 transition-colors focus-within:border-red-300 focus-within:bg-red-50/70">
              <Label
                htmlFor="playerO"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-2"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-red-600 text-white">
                  <Circle className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                Player 2 (O)
              </Label>
              <Input
                id="playerO"
                placeholder="Enter name (e.g. Dalton)"
                value={nameInputO}
                onChange={(e) => setNameInputO(e.target.value)}
                className="bg-white border-red-200/80 h-10 rounded-xl focus-visible:ring-red-500 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Action Footer */}
          <DialogFooter className="px-6 pb-6 pt-0 bg-white">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-md shadow-blue-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Swords className="h-5 w-5" />
              Start Match
              <Sparkles className="h-4 w-4 opacity-80" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
