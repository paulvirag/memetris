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

  const [team, type] = button.split('-');
  const teamName = team === 't1' ? 'Team 1' : 'Team 2';
  return (
    <>
      <div className={'team-label ' + team}>{teamName}</div>
      <div className="play-button" onClick={() => socket.emit(button)}>
        {text(type)}
      </div>
    </>
  );
}

export default MemetrisPlay;
