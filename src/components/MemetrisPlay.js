'use strict';

import React, { useState, useEffect } from 'react';

const text = button => {
  switch (button) {
    case 'left':
      return '⬅️';
    case 'right':
      return '➡️';
    case 'down':
      return '⬇️';
    case 'a':
      return '🅰️';
  }
};

function MemetrisPlay({ socket, config }) {
  const [button, setButton] = useState(null);

  useEffect(() => {
    if (button !== null) {
      return;
    }

    socket.on('assignbutton', v => setButton(v));
    socket.emit('requestbutton');

    return () => socket.off('assignbutton');
  }, [socket, button]);

  useEffect(() => {
    socket.on('disconnect', () => setButton(null));
  }, [socket]);

  if (button === null) {
    return <div>Waiting...</div>;
  }

  const [name, type] = button.split('-');
  const teamName = 'Team ' + name[1];
  return (
    <>
      {config.games > 1 && (
        <div className={'team-label team-' + name}>{teamName}</div>
      )}
      <div className="play-button" onClick={() => socket.emit(button)}>
        {text(type)}
      </div>
    </>
  );
}

export default MemetrisPlay;
