'use strict';

import React from 'react';

function MemetrisScore({ state }) {
  const { score, level, lines, leaderboard } = state;

  return (
    <div className="score-pane">
      <div className="score-section">
        <h1>Score</h1>
        <h2>{score}</h2>
        <h1>Level</h1>
        <h2>{level}</h2>
        <h1>Lines</h1>
        <h2>{lines}</h2>
      </div>
      <div className="score-section">
        <h2>High scores</h2>
        {leaderboard.map((v, i) => (
          <p key={i}>
            {i + 1}. {v}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MemetrisScore;
