'use strict';

import React, { useState, useEffect, useMemo } from 'react';

import MemetrisGrid from './MemetrisGrid';
import MemetrisControls from './MemetrisControls';
import MemetrisScore from './MemetrisScore';

const DEBUG_CONTROLS = true;

function MemetrisRoot() {
  const [state, setState] = useState();
  const socket = useMemo(() => window.io(), []);

  useEffect(() => {
    socket.on('gamestate', v => setState(v));
    return () => socket.off('gamestate');
  }, [socket]);

  if (state == null) {
    return null;
  }

  return (
    <>
      <div className="root">
        <MemetrisGrid grid={state.grid} />
        <MemetrisScore state={state} />
      </div>
      {DEBUG_CONTROLS && <MemetrisControls socket={socket} />}
    </>
  );
}

export default MemetrisRoot;
