'use strict';

import React from 'react';

function MemetrisControls() {
  const onPress = btn => window.io().emit(btn);
  return (
    <div className="controls">
      <button onClick={() => onPress('left')}>Left</button>
      <button onClick={() => onPress('right')}>Right</button>
      <button onClick={() => onPress('a')}>A</button>
      <button onClick={() => onPress('down')}>Down</button>
    </div>
  );
}

export default MemetrisControls;
