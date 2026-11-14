"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { RotateCcw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Player, Scores, WinningLine } from "@/components/game/types";
import { PlayerNameModal } from "@/components/game/player-name-modal";
import { GameBoard } from "@/components/game/game-board";
import { GameStatus } from "@/components/game/game-status";
import { ScoreBoard } from "@/components/game/score-board";
import { GameOverModal } from "@/components/game/game-over-modal";

const WINNING_LINES: WinningLine[] = [
  { a: 0, b: 1, c: 2 },
  { a: 3, b: 4, c: 5 },
  { a: 6, b: 7, c: 8 },
  { a: 0, b: 3, c: 6 },
  { a: 1, b: 4, c: 7 },
  { a: 2, b: 5, c: 8 },
  { a: 0, b: 4, c: 8 },
  { a: 2, b: 4, c: 6 },
];

export default function TicTacToePage() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(true);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState<boolean>(false);
  const [playerXName, setPlayerXName] = useState<string>("Player X");
  const [playerOName, setPlayerOName] = useState<string>("Player O");

  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getWinResult = (squares: Player[]) => {
    for (const line of WINNING_LINES) {
      const { a, b, c } = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: null };
  };

  const { winner, line: winningLine } = getWinResult(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleStartGame = (nameX: string, nameO: string) => {
    setPlayerXName(nameX);
    setPlayerOName(nameO);
    setIsNameModalOpen(false);
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const { winner: newWinner } = getWinResult(newBoard);
    if (newWinner) {
      setScores((prev) => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      modalTimerRef.current = setTimeout(() => {
        setIsGameOverModalOpen(true);
      }, 700);
    } else if (newBoard.every((sq) => sq !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      modalTimerRef.current = setTimeout(() => {
        setIsGameOverModalOpen(true);
      }, 500);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetBoard = () => {
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    setIsGameOverModalOpen(false);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetAll = () => {
    resetBoard();
    setScores({ X: 0, O: 0, draws: 0 });
    setIsNameModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/60 via-slate-50 to-red-50/40 flex flex-col items-center justify-center p-6">
      <PlayerNameModal
        open={isNameModalOpen}
        onOpenChange={setIsNameModalOpen}
        onStartGame={handleStartGame}
      />

      <GameOverModal
        open={isGameOverModalOpen}
        onOpenChange={setIsGameOverModalOpen}
        winner={winner}
        isDraw={isDraw}
        playerXName={playerXName}
        playerOName={playerOName}
        scores={scores}
        onNewRound={resetBoard}
        onChangePlayers={resetAll}
      />

      {/* Header with Logo on the Right */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center gap-3 mb-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-slate-900 to-red-600 bg-clip-text text-transparent">
            Tic-Tac-Toe
          </h1>
          <Image
            src="/tic-tac-toe-logo.png"
            alt="Tic-Tac-Toe Logo"
            width={64}
            height={64}
            className="object-contain mix-blend-multiply"
            priority
          />
        </div>
        <p className="text-slate-600 text-base">
          Challenge your friends in this classic game!
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full items-start">
        <GameBoard
          board={board}
          isXNext={isXNext}
          winningLine={winningLine}
          disabled={Boolean(winner)}
          onSquareClick={handleSquareClick}
        />

        <div className="flex flex-col gap-5">
          <GameStatus
            winner={winner}
            isDraw={isDraw}
            isXNext={isXNext}
            playerXName={playerXName}
            playerOName={playerOName}
          />

          <ScoreBoard
            scores={scores}
            playerXName={playerXName}
            playerOName={playerOName}
            isXNext={isXNext}
            gameOver={Boolean(winner || isDraw)}
          />

          <div className="grid grid-cols-2 gap-3.5">
            <Button
              onClick={resetBoard}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-semibold shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              New Round
            </Button>
            <Button
              onClick={resetAll}
              variant="outline"
              className="bg-white hover:bg-slate-50 text-slate-800 border-slate-200 rounded-xl h-12 font-semibold shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4" />
              Change Players
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-sm text-slate-500">
        Built with React 19, Next.js, Tailwind CSS, and shadcn/ui
      </footer>
    </main>
  );
}
