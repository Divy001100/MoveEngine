import { useEffect, useState } from "react";

export default function Player({ name, symbol, onSaveName, disabled }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  // Keep draft synced if parent changes name (e.g., switching modes)
  useEffect(() => {
    setDraft(name);
  }, [name]);

  function handleToggle() {
    if (disabled) return;

    // If we are saving now
    if (isEditing) {
      onSaveName?.(symbol, draft);
    }
    setIsEditing((prev) => !prev);
  }

  let content = (
    <input
      placeholder={symbol === "X" ? "Player 1" : "Player 2"}
      type="text"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
    />
  );

  if (!isEditing) {
    content = (
      <span className="player">
        <span className="player-name">{name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
    );
  }

  return (
    <li>
      {content}
      <button type="button" onClick={handleToggle} disabled={disabled}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}