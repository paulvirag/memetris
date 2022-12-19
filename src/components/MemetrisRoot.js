'use strict';

import React, { useState, useEffect, useMemo } from 'react';

import MemetrisSpectate from './MemetrisSpectate';
import MemetrisPlay from './MemetrisPlay';

function MemetrisRoot() {
  const socket = useMemo(() => window.io(), []);
  const [config, setConfig] = useState({});

  useEffect(() => {
    socket.on('config', c => setConfig(c));
    socket.emit('requestconfig');

    return () => socket.off('config');
  }, [socket]);

  if (config == null) {
    return null;
  }

  return window.location.href.includes('spectate') ? (
    <MemetrisSpectate socket={socket} config={config} />
  ) : (
    <MemetrisPlay socket={socket} config={config} />
  );
}

export default MemetrisRoot;
