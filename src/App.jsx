import React, { useState } from "react";

function App() {
  const [playerChoice, setPlayerChoice] = useState("unknown");
  const [computerChoice, setComputerChoice] = useState("unknown");
  const [playerHealth, setPlayerHealth] = useState(100);
  const [computerHealth, setComputerHealth] = useState(100);
  const [message, setMessage] = useState("");

  const icons = {
    rock: "../public/batu.png",
    scissors: "../public/gunting.png",
    paper: "../public/kertas.png",
    unknown: "../public/tanda_tanya.png",
  };

  const getResult = (player, computer) => {
    if (player === computer) return "draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "win";
    }
    return "lose";
  };

  const handlePlayerChoice = (choice) => {
    if (playerHealth <= 0 || computerHealth <= 0) return;

    setPlayerChoice(choice);

    const options = ["rock", "paper", "scissors"];
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(randomChoice);

    const result = getResult(choice, randomChoice);

    if (result === "win") {
      setComputerHealth((prev) => Math.max(prev - 20, 0));
      setMessage("Kamu Menang!");
    } else if (result === "lose") {
      setPlayerHealth((prev) => Math.max(prev - 20, 0));
      setMessage("Kamu Kalah!");
    } else {
      setMessage("Seri!");
    }
  };

  const restartGame = () => {
    setPlayerChoice("unknown");
    setComputerChoice("unknown");
    setPlayerHealth(100);
    setComputerHealth(100);
    setMessage("");
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2 className="mb-3">Game Suit VS Computer</h2>
      {message && <h4>{message}</h4>}

      <div className="d-flex justify-content-center gap-4 mt-3">
        <div className="card text-center shadow p-3" style={{ width: "250px" }}>
          <h4>Player</h4>
          <div className="progress mb-2" style={{ height: "20px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${playerHealth}%` }}
            >
              {playerHealth}%
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center border my-2"
            style={{ height: "200px" }}
          >
            <img
              src={icons[playerChoice]}
              alt={playerChoice}
              style={{ maxWidth: "150px" }}
            />
          </div>
          <div className="d-flex justify-content-around border p-2 rounded">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handlePlayerChoice("rock")}
              disabled={playerHealth <= 0 || computerHealth <= 0}
            >
              <img src="../public/batu.png" alt="rock" style={{ width: "30px" }} />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handlePlayerChoice("scissors")}
              disabled={playerHealth <= 0 || computerHealth <= 0}
            >
              <img src="../public/gunting.png" alt="scissors" style={{ width: "30px" }} />
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handlePlayerChoice("paper")}
              disabled={playerHealth <= 0 || computerHealth <= 0}
            >
              <img src="../public/kertas.png" alt="paper" style={{ width: "30px" }} />
            </button>
          </div>
        </div>
        <div className="card text-center shadow p-3" style={{ width: "250px" }}>
          <h4>Computer</h4>
          <div className="progress mb-2" style={{ height: "20px" }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${computerHealth}%` }}
            >
              {computerHealth}%
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center border my-2"
            style={{ height: "200px" }}
          >
            <img
              src={icons[computerChoice]}
              alt={computerChoice}
              style={{ maxWidth: "150px" }}
            />
          </div>
          <div className="d-flex justify-content-around border p-2 rounded">
            <button className="btn btn-primary btn-sm" disabled>
              <img src="../public/batu.png" alt="rock" style={{ width: "30px" }} />
            </button>
            <button className="btn btn-danger btn-sm" disabled>
              <img src="../public/gunting.png" alt="scissors" style={{ width: "30px" }} />
            </button>
            <button className="btn btn-warning btn-sm" disabled>
              <img src="../public/kertas.png" alt="paper" style={{ width: "30px" }} />
            </button>
          </div>
        </div>
      </div>

      {(playerHealth <= 0 || computerHealth <= 0) && (
        <button className="btn btn-success mt-4" onClick={restartGame}>
          Main Lagi 🔄
        </button>
      )}
    </div>
  );
}

export default App;
