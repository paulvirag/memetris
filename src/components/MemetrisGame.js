'use strict';

import React, { useState, useEffect } from 'react';

import MemetrisDebugControls from './MemetrisDebugControls';
import MemetrisGrid from './MemetrisGrid';
import MemetrisScore from './MemetrisScore';

export default function MemetrisGame({ socket, config, i }) {
  const [game, setGame] = useState(null);
  const name = `t${i + 1}`;
  const showAudio = name === 't1';

  useEffect(() => {
    socket.on(`${name}-gamestate`, v => setGame(v));
    socket.emit('requestgamestate', name);

    return () => socket.off(`${name}-gamestate`);
  }, [socket]);

  if (game == null) {
    return null;
  }

  return (
    <>
      <MemetrisScore game={game} showAudio={showAudio} />
      <div className="grid-container">
        {config.games > 1 && (
          <div className={'team-label ' + name}>Team {i + 1}</div>
        )}
        <MemetrisGrid grid={game.grid} />
        {config.debugControls && (
          <MemetrisDebugControls socket={socket} name={name} />
        )}
      </div>
    </>
  );
}
