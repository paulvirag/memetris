'use strict';

import React from 'react';

function MemetrisControls() {
  const onPress = btn => window.io().emit(btn);
  return (
    <div className="control-bar">
      <button className="control-button" onClick={() => onPress('left')}>
        Left
      </button>
      <button className="control-button" onClick={() => onPress('right')}>
        Right
      </button>
      <button className="control-button" onClick={() => onPress('a')}>
        A
      </button>
      <button className="control-button" onClick={() => onPress('down')}>
        Down
      </button>
    </div>
  );
}

export default MemetrisControls;
