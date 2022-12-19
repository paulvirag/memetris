'use strict';

import React from 'react';

function MemetrisDebugControls({ socket, name }) {
  return (
    <div className="control-bar">
      <button
        className="control-button"
        onClick={() => socket.emit(`${name}-left`)}
      >
        Left
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`${name}-right`)}
      >
        Right
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`${name}-a`)}
      >
        A
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`${name}-down`)}
      >
        Down
      </button>
    </div>
  );
}

export default MemetrisDebugControls;
