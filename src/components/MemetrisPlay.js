'use strict';

import React, { useState, useEffect } from 'react';

const caps = button => button[0].toUpperCase() + button.substr(1);

function MemetrisPlay({ socket }) {
  const [button, setButton] = useState();

  useEffect(() => {
    socket.emit('requestbutton');
  }, [socket]);

  useEffect(() => {
    socket.on('assign', v => setButton(v));
    return () => socket.off('assign');
  }, [socket]);

  if (button == null) {
    return <div>Waiting...</div>;
  }

  return (
    <div className="control-bar">
      <button className="control-button" onClick={() => socket.emit(button)}>
        {caps(button)}
      </button>
    </div>
  );
}

export default MemetrisPlay;
