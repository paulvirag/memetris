'use strict';

import React, { useState, useEffect } from 'react';

import MemetrisGrid from './MemetrisGrid';
import MemetrisControls from './MemetrisControls';
import MemetrisScore from './MemetrisScore';
import MemetrisAd from './MemetrisAd';

const DEBUG_CONTROLS = false;

function MemetrisSpectate({ socket }) {
  const [state, setState] = useState();

  useEffect(() => {
    socket.on('gamestate', v => setState(v));
    return () => socket.off('gamestate');
  }, [socket]);

  if (state == null) {
    return null;
  }

  const { game1, game2 } = state;

  return (
    <>
      <div className="root">
        {game1 && (
          <>
            <MemetrisScore game={game1} showAudio={true} />
            <div className="grid-container">
              <div className="team-label t1">Team 1</div>
              <MemetrisGrid grid={game1.grid} />
            </div>
          </>
        )}
        {game2 && (
          <>
            <div className="grid-container">
              <div className="team-label t2">Team 2</div>
              <MemetrisGrid grid={game2.grid} />
            </div>
            <MemetrisScore game={game2} />
          </>
        )}
      </div>
      {DEBUG_CONTROLS && <MemetrisControls socket={socket} />}
      <MemetrisAd />
    </>
  );
}

export default MemetrisSpectate;
