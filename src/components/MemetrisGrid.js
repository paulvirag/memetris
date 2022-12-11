'use strict';

import React from 'react';

function MemetrisGrid({ state }) {
  return (
    <div className="grid">
      {state.map((row, i) => (
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
