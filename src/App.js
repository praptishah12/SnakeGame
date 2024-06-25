import React, { useState } from 'react';
import SnakeGame from './SnakeGame';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  const [scores, setScores] = useState([]);

  const handleGameOver = (score) => {
    const name = prompt('Game Over! Enter your name:');
    if (name) {
      setScores([...scores, { name, score }]);
    }
  };

  return (
    <div className="app">
      <div className="game-container">
        <SnakeGame onGameOver={handleGameOver} />
        <Leaderboard scores={scores} />
      </div>
    </div>
  );
}

export default App;