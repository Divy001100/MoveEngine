const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board) {
  for (const [a, b, c] of LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return v; // "X" or "O"
  }

  // draw if no empty cells
  if (board.every((x) => x !== null)) return "draw";

  return null;
}