'use strict';

import React from 'react';

const caps = button => button[0].toUpperCase() + button.substr(1);

function MemetrisPlay({ socket, button }) {
  return (
    <div className="control-bar">
      <button className="control-button" onClick={() => socket.emit(button)}>
        {caps(button)}
      </button>
    </div>
  );
}

export default MemetrisPlay;
