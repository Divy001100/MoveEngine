import { useEffect, useMemo, useState } from "react";
import Board from "./Board";
import { checkWinner } from "../utils/checkWinner";
import { getBestMoveRuleBased } from "../utils/ai";

const EMPTY = Array(9).fill(null);

export default function Game({ mode, players }) {
  const [board, setBoard] = useState(EMPTY);
  const [active, setActive] = useState("X"); // "X" starts
  const [winner, setWinner] = useState(null); // "X" | "O" | "draw" | null
  const [isThinking, setIsThinking] = useState(false);

  // Reset game whenever mode changes
  useEffect(() => {
    setBoard(EMPTY);
    setActive("X");
    setWinner(null);
    setIsThinking(false);
  }, [mode]);

  const statusText = useMemo(() => {
    if (winner === "draw") return "Draw.";
    if (winner) return `${players[winner]} wins!`;
    if (mode === "ai" && active === "O") return `AI thinking...`;
    return `${players[active]}'s turn (${active})`;
  }, [winner, active, players, mode]);

  function resetGame() {
    setBoard(EMPTY);
    setActive("X");
    setWinner(null);
    setIsThinking(false);
  }

  function placeMove(index, symbol) {
    setBoard((prev) => {
      if (prev[index] || winner) return prev;
      const next = prev.slice();
      next[index] = symbol;
      return next;
    });
  }

  function handleSquareClick(index) {
    if (winner) return;
    if (isThinking) return; // don't allow clicks during AI move
    if (board[index]) return;

    // If AI mode and it's AI turn, ignore
    if (mode === "ai" && active === "O") return;

    // Human or current player move
    const symbol = active;
    const nextBoard = board.slice();
    nextBoard[index] = symbol;

    // Update board immediately
    setBoard(nextBoard);

    const w = checkWinner(nextBoard);
    if (w) {
      setWinner(w);
      return;
    }

    // Switch turn
    const nextActive = symbol === "X" ? "O" : "X";
    setActive(nextActive);
  }

  // AI move effect (when in AI mode and it's O's turn)
  useEffect(() => {
    if (mode !== "ai") return;
    if (winner) return;
    if (active !== "O") return;

    setIsThinking(true);

    const timer = setTimeout(() => {
      const ai = "O";
      const human = "X";
      const move = getBestMoveRuleBased(board, ai, human);

      if (move == null) {
        setIsThinking(false);
        return;
      }

      const nextBoard = board.slice();
      nextBoard[move] = ai;
      setBoard(nextBoard);

      const w = checkWinner(nextBoard);
      if (w) {
        setWinner(w);
        setIsThinking(false);
        return;
      }

      setActive("X");
      setIsThinking(false);
    }, 450); // small delay makes it feel human

    return () => clearTimeout(timer);
  }, [mode, active, board, winner]);

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 10 }}>{statusText}</div>

      <Board board={board} onSquareClick={handleSquareClick} />

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={resetGame}>
          Restart
        </button>
      </div>
    </div>
  );
}