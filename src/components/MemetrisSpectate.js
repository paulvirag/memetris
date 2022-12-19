'use strict';

import React from 'react';

import MemetrisAd from './MemetrisAd';
import MemetrisGame from './MemetrisGame';

function MemetrisSpectate({ socket, config }) {
  const { games } = config;
  return (
    <>
      <div className="root">
        {Array(games)
          .fill(0)
          .map((_, i) => (
            <MemetrisGame key={i} socket={socket} config={config} i={i} />
          ))}
      </div>
      {config.showAds && <MemetrisAd />}
    </>
  );
}

export default MemetrisSpectate;
