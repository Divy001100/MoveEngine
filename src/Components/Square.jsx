export default function Square({ value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: 28,
        cursor: "pointer",
      }}
    >
      {value ?? ""}
    </button>
  );
}