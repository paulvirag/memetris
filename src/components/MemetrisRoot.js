'use strict';

import React, { useState, useEffect } from 'react';

import MemetrisGrid from './MemetrisGrid';
import MemetrisControls from './MemetrisControls';

function MemetrisRoot() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const socket = window.io();
    socket.on('gamestate', msg => setState(msg));

    return () => socket.off('gamestate');
  }, []);

  return (
    <div id="root">
      <MemetrisGrid state={state} />
      <MemetrisControls />
    </div>
  );
}

export default MemetrisRoot;
