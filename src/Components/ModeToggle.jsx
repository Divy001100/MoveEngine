export default function ModeToggle({ mode, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button
        type="button"
        onClick={() => onChange("pvp")}
        aria-pressed={mode === "pvp"}
      >
        Player vs Player
      </button>

      <button
        type="button"
        onClick={() => onChange("ai")}
        aria-pressed={mode === "ai"}
      >
        Player vs AI
      </button>
    </div>
  );
}