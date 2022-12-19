'use strict';

import React from 'react';

import cx from '../util/cx';

function MemetrisGrid({ game }) {
  const { grid, pendingGarbage } = game;
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div className="grid-row" key={i}>
          {row.map((v, j) => (
            <div
              className={cx({
                'grid-block': true,
                [`piece${v}`]: true,
                [`shake${((i + j) % 4) + 1}`]: true,
                shaking: grid.length - i <= pendingGarbage,
              })}
              key={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MemetrisGrid;
