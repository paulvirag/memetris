'use strict';

import React from 'react';

function MemetrisScore({ state }) {
  const { score, level, lines } = state;

  return (
    <div className="score-pane">
      <h1>Score</h1>
      <h2>{score}</h2>
      <h1>Level</h1>
      <h2>{level}</h2>
      <h1>Lines</h1>
      <h2>{lines}</h2>
    </div>
  );
}

export default MemetrisScore;
