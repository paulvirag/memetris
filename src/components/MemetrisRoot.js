'use strict';

import React, { useState, useEffect } from 'react';

function MemetrisRoot() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const socket = window.io();
    socket.on('gamestate', msg => setState(msg));

    return () => socket.off('gamestate');
  }, []);

  return (
    <div>
      {state.map(row => (
        <div>{row.join('')}</div>
      ))}
    </div>
  );
}

export default MemetrisRoot;
