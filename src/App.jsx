import { useState } from "react";
import ModeToggle from "./Components/ModeToggle";
import Player from "./Components/Player";
import Game from "./Components/Game";

export default function App() {
  const [mode, setMode] = useState("pvp"); // "pvp" | "ai"
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  function handleModeChange(nextMode) {
    setMode(nextMode);

   
    setPlayers((prev) => ({
      ...prev,
      O: nextMode === "ai" ? "AI" : "Player 2",
    }));
  }

  function handlePlayerNameSave(symbol, newName) {
    setPlayers((prev) => ({
      ...prev,
      [symbol]: newName.trim() ? newName.trim() : prev[symbol],
    }));
  }

  return (
    <div id="game-container">
      <ModeToggle mode={mode} onChange={handleModeChange} />

      <ol id="players">
        <Player
          name={players.X}
          symbol="X"
          onSaveName={handlePlayerNameSave}
          disabled={false}
        />

        <Player
          name={players.O}
          symbol="O"
          onSaveName={handlePlayerNameSave}
          // Optional: lock AI name editing if you want
          disabled={mode === "ai"}
        />
      </ol>

      <Game mode={mode} players={players} />
    </div>
  );
}