// src/Leaderboard.js
import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ scores }) => {
  const [sortedScores, setSortedScores] = useState([]);

  useEffect(() => {
    const sorted = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);
    setSortedScores(sorted);
    localStorage.setItem('leaderboard', JSON.stringify(sorted));
  }, [scores]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {sortedScores.map((scoreEntry, index) => (
          <li key={index}>{`${scoreEntry.name}: ${scoreEntry.score}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;