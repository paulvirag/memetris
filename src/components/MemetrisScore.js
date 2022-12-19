'use strict';

import React from 'react';

function MemetrisScore({ game, showAudio = false }) {
  const { score, level, lines } = game;

  return (
    <div className="score-pane">
      <div className="score-section">
        {showAudio && (
          <audio src="/sounds/tetris.m4a" loop controls="none"></audio>
        )}
        <h2>Score</h2>
        <p>{score}</p>
        <h2>Level</h2>
        <p>{level}</p>
        <h2>Lines</h2>
        <p>{lines}</p>
      </div>
    </div>
  );
}

export default MemetrisScore;
