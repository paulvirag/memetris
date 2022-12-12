'use strict';

import React from 'react';

function MemetrisScore({ state, controllerState }) {
  const { score, level, lines, leaderboard } = state;

  return (
    <div className="score-pane">
      <div>
        <audio src="/sounds/tetris.m4a" autoplay loop controls="none"></audio>
        <h2>Score</h2>
        <h3>{score}</h3>
        <h2>Level</h2>
        <h3>{level}</h3>
        <h2>Lines</h2>
        <h3>{lines}</h3>
      </div>
      <div>
        <h3>Inputs assigned</h3>
        {controllerState?.join(', ')}
      </div>
      <div className="score-leaderboard-section">
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
