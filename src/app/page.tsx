"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Player, Scores } from "@/components/game/types";
import { PlayerNameModal } from "@/components/game/player-name-modal";
import { GameBoard } from "@/components/game/game-board";
import { GameStatus } from "@/components/game/game-status";
import { ScoreBoard } from "@/components/game/score-board";

const WINNING_LINES = [
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
  const [playerXName, setPlayerXName] = useState<string>("Player X");
  const [playerOName, setPlayerOName] = useState<string>("Player O");

  const calculateWinner = (squares: Player[]): Player => {
    for (const { a, b, c } of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
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

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setScores((prev) => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
    } else if (newBoard.every((sq) => sq !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetAll = () => {
    resetBoard();
    setScores({ X: 0, O: 0, draws: 0 });
    setIsNameModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50/70 flex flex-col items-center justify-center p-6">
      <PlayerNameModal
        open={isNameModalOpen}
        onOpenChange={setIsNameModalOpen}
        onStartGame={handleStartGame}
      />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
          Tic-Tac-Toe
        </h1>
        <p className="text-slate-600 text-base">
          Challenge your friends in this classic game!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full items-start">
        <GameBoard
          board={board}
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
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={resetBoard}
              className="bg-zinc-500 hover:bg-zinc-600 text-white rounded-lg h-11 font-medium"
            >
              New Game
            </Button>
            <Button
              onClick={resetAll}
              variant="outline"
              className="bg-white hover:bg-slate-50 text-slate-800 border-slate-200 rounded-lg h-11 font-medium"
            >
              Reset All
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
