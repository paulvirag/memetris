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

  const { game, controller } = state;
  if (game == null) {
    return null;
  }

  return (
    <>
      <div className="root">
        <MemetrisGrid grid={game.grid} />
        <MemetrisScore state={game} controllerState={controller} />
      </div>
      {DEBUG_CONTROLS && <MemetrisControls socket={socket} />}
      <MemetrisAd />
    </>
  );
}

export default MemetrisSpectate;
