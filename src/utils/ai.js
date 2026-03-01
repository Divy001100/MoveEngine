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

function findWinningMove(board, player) {
  for (const [a, b, c] of LINES) {
    const line = [a, b, c];
    const vals = line.map((i) => board[i]);
    const playerCount = vals.filter((v) => v === player).length;
    const emptyCount = vals.filter((v) => v === null).length;
    if (playerCount === 2 && emptyCount === 1) {
      return line[vals.indexOf(null)];
    }
  }
  return null;
}

function availableIn(board, indices) {
  return indices.filter((i) => board[i] === null);
}

export function getBestMoveRuleBased(board, ai = "O", human = "X") {
  // 1) Win if possible
  const win = findWinningMove(board, ai);
  if (win !== null) return win;

  // 2) Block human win
  const block = findWinningMove(board, human);
  if (block !== null) return block;

  // 3) Take center
  if (board[4] === null) return 4;

  // 4) Take opposite corner
  const opposites = [
    [0, 8],
    [2, 6],
    [6, 2],
    [8, 0],
  ];
  for (const [h, opp] of opposites) {
    if (board[h] === human && board[opp] === null) return opp;
  }

  // 5) Take any corner
  const corners = availableIn(board, [0, 2, 6, 8]);
  if (corners.length) return corners[0];

  // 6) Take any side
  const sides = availableIn(board, [1, 3, 5, 7]);
  if (sides.length) return sides[0];

  // no move
  return null;
}