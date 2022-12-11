'use strict';

import React, { useState, useEffect, useMemo } from 'react';

import MemetrisGrid from './MemetrisGrid';
import MemetrisControls from './MemetrisControls';

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
    <div id="root">
      <MemetrisGrid state={state.grid} />
      <MemetrisControls socket={socket} />
    </div>
  );
}

export default MemetrisRoot;
