'use strict';

import React from 'react';

function MemetrisControls({ socket }) {
  return (
    <div className="control-bar">
      <button className="control-button" onClick={() => socket.emit('left')}>
        Left
      </button>
      <button className="control-button" onClick={() => socket.emit('right')}>
        Right
      </button>
      <button className="control-button" onClick={() => socket.emit('a')}>
        A
      </button>
      <button className="control-button" onClick={() => socket.emit('down')}>
        Down
      </button>
    </div>
  );
}

export default MemetrisControls;
