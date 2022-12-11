'use strict';

import React from 'react';

function MemetrisGrid({ grid }) {
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div className="grid-row" key={i}>
          {row.map((v, j) => (
            <div className={'grid-block color' + v} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MemetrisGrid;
