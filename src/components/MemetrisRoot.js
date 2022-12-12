'use strict';

import React, { useMemo } from 'react';

import MemetrisSpectate from './MemetrisSpectate';
import MemetrisPlay from './MemetrisPlay';

function MemetrisRoot() {
  const socket = useMemo(() => window.io(), []);

  return window.location.href.includes('spectate') ? (
    <MemetrisSpectate socket={socket} />
  ) : (
    <MemetrisPlay socket={socket} button="left" />
  );
}

export default MemetrisRoot;
