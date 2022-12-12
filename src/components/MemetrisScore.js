'use strict';

import React from 'react';

function MemetrisScore({ state, controllerState }) {
  const { score, level, lines, leaderboard } = state;

  return (
    <div className="score-pane">
      <div>
        <audio src="/sounds/tetris.m4a" autoplay loop controls="none"></audio>
        <h2>Score</h2>
        <p>{score}</p>
        <h2>Level</h2>
        <p>{level}</p>
        <h2>Lines</h2>
        <p>{lines}</p>
      </div>
      <div>
        <h3>Inputs assigned</h3>
        {controllerState?.join(', ')}
      </div>
      <div className="score-leaderboard-section">
        <h3>High scores</h3>
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
