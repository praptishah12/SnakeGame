// src/App.js
import React, { useState } from 'react';
import SnakeGame from './SnakeGame';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  const [scores, setScores] = useState([]);

  const handleGameOver = (score) => {
    const playerName = prompt('Game Over! Enter your name:', 'Player');
    if (playerName) {
      const newScore = { name: playerName, score };
      setScores(prevScores => [...prevScores, newScore]);
    }
  };

  return (
    <div className="App">
      <SnakeGame onGameOver={handleGameOver} />
      <Leaderboard scores={scores} />
    </div>
  );
}

export default App;