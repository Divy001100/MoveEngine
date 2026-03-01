import Square from "./Square";

export default function Board({ board, onSquareClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 80px)",
        gap: 8,
      }}
    >
      {board.map((cell, idx) => (
        <Square key={idx} value={cell} onClick={() => onSquareClick(idx)} />
      ))}
    </div>
  );
}