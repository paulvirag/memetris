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

  const { game1, game2, controller } = state;

  return (
    <>
      <div className="root">
        {game1 && (
          <>
            <MemetrisScore
              game={game1}
              controller={controller}
              showAudio={true}
            />
            <MemetrisGrid grid={game1.grid} />
          </>
        )}
        {game2 && (
          <>
            <MemetrisGrid grid={game2.grid} controller={controller} />
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
