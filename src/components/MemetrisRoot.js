'use strict';

import React, { useState, useEffect } from 'react';

import MemetrisGrid from './MemetrisGrid';

function MemetrisRoot() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const socket = window.io();
    socket.on('gamestate', msg => setState(msg));

    return () => socket.off('gamestate');
  }, []);

  return <MemetrisGrid state={state} />;
}

export default MemetrisRoot;
