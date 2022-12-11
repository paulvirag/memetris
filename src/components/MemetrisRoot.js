'use strict';

import React, { useEffect } from 'react';

function MemetrisRoot() {
  useEffect(() => {
    const socket = window.io();
    socket.on('hello', msg => console.log(msg));

    return () => socket.off('hello');
  }, []);
  return <div>hello from react</div>;
}

export default MemetrisRoot;
