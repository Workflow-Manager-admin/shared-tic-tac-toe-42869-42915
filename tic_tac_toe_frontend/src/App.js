import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main application component for Tic Tac Toe game.
 * Provides gameplay, turn/winner/draw status, and reset functionality, adhering to provided modern minimalistic style.
 */
function App() {
  // Represents the game board as a flat array (9 cells)
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player: 'X' or 'O'
  const [xIsNext, setXIsNext] = useState(true);
  // Game status: "playing", "won", "draw"
  const [gameStatus, setGameStatus] = useState("playing");
  // The winner, if any; 'X' or 'O'
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Check for winner or draw on every board update
    const winnerVal = calculateWinner(board);
    if (winnerVal) {
      setGameStatus("won");
      setWinner(winnerVal);
    } else if (board.every((cell) => cell !== null)) {
      setGameStatus("draw");
    } else {
      setGameStatus("playing");
      setWinner(null);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  // Handles click on a cell
  function handleCellClick(idx) {
    if (board[idx] || gameStatus !== "playing") return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  // Resets the game state
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("playing");
    setWinner(null);
  }

  // Display game status message
  let statusMessage;
  if (gameStatus === "won") {
    statusMessage = (
      <span>
        <span className="winner-text" data-testid="winner">
          {winner}
        </span>{" "}
        wins!
      </span>
    );
  } else if (gameStatus === "draw") {
    statusMessage = (
      <span className="draw-text" data-testid="draw">It’s a draw!</span>
    );
  } else {
    statusMessage = (
      <span>
        Turn:{" "}
        <span
          className={
            xIsNext ? "player-x-text" : "player-o-text"
          }
        >
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-app-bg">
      <main className="ttt-center-outer">
        <section className="ttt-board-section">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameStatus !== "playing"}
          />
          <div className="ttt-controls">
            <div className="ttt-status-indicator">{statusMessage}</div>
            <button
              className="ttt-btn-restart"
              onClick={handleRestart}
              data-testid="restart"
            >
              Restart Game
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function GameBoard({ board, onCellClick, disabled }) {
  // Renders the 3x3 grid of Squares
  return (
    <div className="ttt-board">
      {board.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onCellClick(idx)}
          disabled={disabled || !!val}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function Square({ value, onClick, disabled }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `${value}` : "empty"}
      tabIndex={0}
    >
      {value && (
        <span className={value === "X" ? "player-x-text" : "player-o-text"}>
          {value}
        </span>
      )}
    </button>
  );
}

// PUBLIC_INTERFACE
/**
 * Determines the winner of the Tic Tac Toe game.
 * Returns "X", "O", or null if there is no winner yet.
 */
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // cols
    [0, 4, 8],[2, 4, 6],           // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

export default App;
