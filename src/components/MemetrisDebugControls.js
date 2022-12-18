'use strict';

import React from 'react';

function MemetrisDebugControls({ socket, index }) {
  return (
    <div className="control-bar">
      <button
        className="control-button"
        onClick={() => socket.emit(`t${index}-left`)}
      >
        Left
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`t${index}-right`)}
      >
        Right
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`t${index}-a`)}
      >
        A
      </button>
      <button
        className="control-button"
        onClick={() => socket.emit(`t${index}-down`)}
      >
        Down
      </button>
    </div>
  );
}

export default MemetrisDebugControls;
